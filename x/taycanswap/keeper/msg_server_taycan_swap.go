package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hupayx-com/taycanSwap/x/taycanswap/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k msgServer) TaycanSwap(goCtx context.Context, msg *types.MsgTaycanSwap) (*types.MsgTaycanSwapResponse, error) {

	ctx := sdk.UnwrapSDKContext(goCtx)

	k.Logger(ctx).Info("doing Swap \n\n\n\n\n")

	k.Logger(ctx).Info(k.GetParams(ctx).SwapRestEndpoint)

	if !k.GetParams(ctx).SwapEnabled {
		return &types.MsgTaycanSwapResponse{}, status.Error(codes.Aborted, "not enable swap")
	}

	if msg == nil {
		return &types.MsgTaycanSwapResponse{}, status.Error(codes.InvalidArgument, "invalid request")
	}

	reqCoin := msg.Coin

	// TODO
	err, price := getPrice(k.GetParams(ctx).SwapTokenId, k.GetParams(ctx).SwapRestEndpoint)
	if err != nil {
		return &types.MsgTaycanSwapResponse{}, err
	}

	k.Logger(ctx).Info(price.String())

	swapDenom := k.GetParams(ctx).SwapBaseDenom // asfd (genesis.json)

	baseDenom, _ := sdk.GetBaseDenom()

	k.Logger(ctx).Info(fmt.Sprintf("baseDenom : %s", baseDenom))
	k.Logger(ctx).Info(fmt.Sprintf("swapDenom : %s", swapDenom))

	var swapReward, origin sdk.Coin
	unit, _ := sdk.GetDenomUnit(baseDenom)
	sunit, _ := sdk.GetDenomUnit(swapDenom)

	if reqCoin.Denom == baseDenom { // asfl(코인을 주면 달러로)

		k.Logger(ctx).Info("coin to dollar \n\n\n\n\n")

		preCommition := k.GetParams(ctx).SwapPreCommition // 0.98 (genesis.json)
		swapCommition := sdk.NewDecWithPrec(1, 0).Sub(preCommition)

		// 민팅될 수수료
		swapRewardDec := reqCoin.Amount.ToDec().Mul(swapCommition)

		// 수수료 차감금액만큼
		originDec := reqCoin.Amount.ToDec().Mul(preCommition)

		decAmount := swapCoin(price, originDec)

		enableAmount, _ := sdk.NewDecFromStr(k.GetParams(ctx).SwapAmount)

		k.Logger(ctx).Info(fmt.Sprintf("--------- %d", enableAmount.RoundInt64()))

		// store := ctx.KVStore(k.storeKey)

		// bz := store.Get(types.SupplyKey)

		// var supply types.Supply

		// var totalSupply int64

		// k.Logger(ctx).Info("--------- : coin convert")
		swapReward = sdk.NewCoin(baseDenom, swapRewardDec.RoundInt()) // 모듈 mint
		// k.Logger(ctx).Info("--------- : totalsupply")
		origin = sdk.NewCoin("asfd", decAmount.Mul(unit).Quo(sunit).RoundInt()) // 모듈 mint

		if enableAmount.Sub(origin.Amount.ToDec()).RoundInt64() < 0 {
			return &types.MsgTaycanSwapResponse{}, status.Error(codes.InvalidArgument, "swap change limit over")
		}

		k.SetSwapAmount(ctx, enableAmount.Sub(origin.Amount.ToDec()).String())

		// if len(bz) == 0 {
		// 	k.Logger(ctx).Info(fmt.Sprintf("---------totalSupply origin : %d", origin.Amount))
		// 	totalSupply = origin.Amount.Int64()
		// 	k.Logger(ctx).Info("---------totalSupply convert : %d", totalSupply)
		// } else {
		// 	k.Logger(ctx).Info("---------totalSupply > 0")
		// 	if err := k.cdc.Unmarshal(bz, &supply); err != nil {
		// 		return &types.MsgTaycanSwapResponse{}, err
		// 	}
		// 	totalSupply = int64(supply.SupplyAmount + origin.RoundInt().Uint64())
		// }

		// k.Logger(ctx).Info(fmt.Sprintf("supplyAmount!!! : %d", totalSupply))
		// supply.SupplyAmount = uint64(totalSupply)
		// k.Logger(ctx).Info(fmt.Sprintf("supplyAmount???? : %d", supply.SupplyAmount))

		// // 달러 변경시 총 공급량이하인지 체크
		// if enableAmount.RoundInt().LT(sdk.NewInt(totalSupply)) {
		// 	return &types.MsgTaycanSwapResponse{}, status.Error(codes.InvalidArgument, "swap change limit over")
		// }

		// k.Logger(ctx).Info("mustMarshal~~~")

		// b := k.cdc.MustMarshal(&supply)
		// store.Set(types.SupplyKey, b)

	} else if reqCoin.Denom == swapDenom { // asfd

		enableAmount, _ := sdk.NewDecFromStr(k.GetParams(ctx).SwapAmount)

		k.SetSwapAmount(ctx, enableAmount.Add(reqCoin.Amount.ToDec()).String())

		commition := k.GetParams(ctx).SwapPostCommition // 0.98 (genesis.json)
		swapCommition := sdk.NewDecWithPrec(1, 0).Sub(commition)

		// 달러가 asfl로 바뀐 금액이 나온다.
		decAmount := swapDollar(price, reqCoin.Amount.ToDec())

		swapRewardDec := decAmount.Mul(swapCommition)
		originDec := decAmount.Mul(commition)

		swapReward = sdk.NewCoin(baseDenom, swapRewardDec.Mul(sunit).Quo(unit).RoundInt()) // 모듈 mint
		origin = sdk.NewCoin(baseDenom, originDec.Mul(sunit).Quo(unit).RoundInt())         // 모듈 mint

	} else {
		return &types.MsgTaycanSwapResponse{}, status.Error(codes.InvalidArgument, "invalid request")
	}

	k.Logger(ctx).Info("swap 계산완료 \n\n\n\n\n")

	// // 모듈 이체 유져에게

	from, err := sdk.AccAddressFromBech32(msg.GetCreator())

	if err != nil {
		return nil, err
	}

	// 요청 수량만큼 모듈로 이동
	if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, from, types.ModuleName, sdk.NewCoins(reqCoin)); err != nil {
		return nil, err
	}
	k.Logger(ctx).Debug("요청 수량만큼 모듈로 이동 \n\n\n\n\n")
	// 요청 수량만큼 전부 소각
	if err := k.bankKeeper.BurnCoins(ctx, types.ModuleName, sdk.NewCoins(reqCoin)); err != nil {
		return nil, err
	}
	k.Logger(ctx).Debug("요청 수량만큼 전부 소각 \n\n\n\n\n")
	// 모듈에 수수료 만큼 민트 ==> sfl만 mint됨
	if err := k.bankKeeper.MintCoins(ctx, types.ModuleName, sdk.NewCoins(swapReward)); err != nil {
		return nil, err
	}
	k.Logger(ctx).Debug("모듈에 수수료 만큼 민트 \n\n\n\n\n")
	// swap 수량 만큼 mint
	if err := k.bankKeeper.MintCoins(ctx, types.ModuleName, sdk.NewCoins(origin)); err != nil {
		return nil, err
	}
	k.Logger(ctx).Debug("swap 수량 만큼 mint \n\n\n\n\n")
	// swap mint 수량만큼 계정으로 이체
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, from, sdk.NewCoins(origin)); err != nil {
		return nil, err
	}
	k.Logger(ctx).Debug("swap mint 수량만큼 계정으로 이체 \n\n\n\n\n")
	return &types.MsgTaycanSwapResponse{}, nil
}
