package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hupayx-com/taycanSwap/x/taycanswap/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) EstimateSwap(goCtx context.Context, req *types.QueryEstimateSwapRequest) (*types.QueryEstimateSwapResponse, error) {
	var result sdk.DecCoin
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.Logger(ctx).Info("EstimateSwap")

	k.Logger(ctx).Info(k.GetParams(ctx).SwapRestEndpoint)

	k.Logger(ctx).Info(fmt.Sprintf("%t", k.GetParams(ctx).SwapEnabled))

	if !k.GetParams(ctx).SwapEnabled { // true (genesis.json)
		return &types.QueryEstimateSwapResponse{Coin: result}, status.Error(codes.Aborted, "not enable swap")
	}

	if req == nil {
		return &types.QueryEstimateSwapResponse{Coin: result}, status.Error(codes.InvalidArgument, "invalid request")
	}

	err, price := getPrice(k.GetParams(ctx).SwapTokenId, k.GetParams(ctx).SwapRestEndpoint) // hupayx, https://api.coingecko.com/api/v3/simple/price?ids=hupayx&vs_currencies=usd (genesis.json)
	if err != nil {
		return &types.QueryEstimateSwapResponse{Coin: result}, err
	}

	k.Logger(ctx).Info(price.String())

	swapDenom := k.GetParams(ctx).SwapBaseDenom // asfd (genesis.json)

	reqCoin := req.Coin
	baseDenom, _ := sdk.GetBaseDenom()

	// k.Logger(ctx).Info(fmt.Sprintf("%d", reqCoin.Amount.Int64()))

	if req.Coin.Denom == baseDenom { // asfl(코인을 주면 달러로)
		preCommition := k.GetParams(ctx).SwapPreCommition // 0.98 (genesis.json)
		k.Logger(ctx).Info(fmt.Sprintf("%f", preCommition))
		// 나온값은 sfl을 통해 나온값이잖어
		test := reqCoin.Amount.ToDec().Mul(preCommition)
		decAmount := swapCoin(price, test)
		// convertCoin asfd -> sfd
		unit, _ := sdk.GetDenomUnit(baseDenom)
		// sunit, _ := sdk.GetDenomUnit(swapDenom)
		result = sdk.NewDecCoinFromDec("sfd", decAmount.Mul(unit))
	} else if reqCoin.Denom == swapDenom { // asfd
		postCommition := k.GetParams(ctx).SwapPostCommition // 0.98 (genesis.json)
		k.Logger(ctx).Info(fmt.Sprintf("%f", postCommition))
		// 나온값은 sfl을 통해 나온값이잖어
		test := reqCoin.Amount.ToDec().Mul(postCommition)

		decAmount := swapDollar(price, test)
		// convertCoin asfl -> sfl
		// unit, _ := sdk.GetDenomUnit(baseDenom)
		sunit, _ := sdk.GetDenomUnit(swapDenom)
		result = sdk.NewDecCoinFromDec("sfl", decAmount.Mul(sunit))
	} else {
		return &types.QueryEstimateSwapResponse{Coin: result}, status.Error(codes.InvalidArgument, "invalid request")
	}

	return &types.QueryEstimateSwapResponse{Coin: result}, nil
}
