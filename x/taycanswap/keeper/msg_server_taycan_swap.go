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
	var result sdk.DecCoin

	ctx := sdk.UnwrapSDKContext(goCtx)

	k.Logger(ctx).Info("doing Swap")

	k.Logger(ctx).Info(k.GetParams(ctx).SwapRestEndpoint)

	if !k.GetParams(ctx).SwapEnabled {
		return &types.MsgTaycanSwapResponse{}, status.Error(codes.Aborted, "not enable swap")
	}

	if msg == nil {
		return &types.MsgTaycanSwapResponse{}, status.Error(codes.InvalidArgument, "invalid request")
	}

	// TODO
	err, price := getPrice(k.GetParams(ctx).SwapTokenId, k.GetParams(ctx).SwapRestEndpoint)
	if err != nil {
		return &types.MsgTaycanSwapResponse{}, err
	}

	k.Logger(ctx).Info(price.String())

	commition := k.GetParams(ctx).SwapCommition

	k.Logger(ctx).Info(fmt.Sprintf("%f", commition))

	reqCoin := msg.Coin

	// TODO
	if !(reqCoin.Denom == "stake" || reqCoin.Denom == "token") {
		return &types.MsgTaycanSwapResponse{}, status.Error(codes.InvalidArgument, "invalid request")
	}

	amountDec := reqCoin.Amount

	var cnt sdk.Dec
	if msg.Coin.Denom == "token" {
		cnt = swapCoin(price, amountDec, commition)
	} else {
		cnt = swapDollar(price, amountDec, commition)
	}

	_ = cnt
	// from, err := sdk.AccAddressFromBech32(msg.GetCreator())

	// if err != nil {
	// 	return nil, err
	// }

	_ = result

	// if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, from, reqCoin); err != nil {
	// 	return nil, err
	// }

	// if err := k.bankKeeper.BurnCoins(ctx, types.ModuleName, coins); err != nil {
	// 	return nil, err
	// }

	// coins := sdk.NewCoins(result)
	// k.bankKeeper.MintCoins(ctx, types.ModuleName, coins)

	return &types.MsgTaycanSwapResponse{}, nil
}
