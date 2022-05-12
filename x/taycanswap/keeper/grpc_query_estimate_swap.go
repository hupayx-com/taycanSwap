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

	if !k.GetParams(ctx).SwapEnabled {
		return &types.QueryEstimateSwapResponse{result}, status.Error(codes.Aborted, "not enable swap")
	}

	if req == nil {
		return &types.QueryEstimateSwapResponse{result}, status.Error(codes.InvalidArgument, "invalid request")
	}

	// TODO
	err, price := getPrice(k.GetParams(ctx).SwapTokenId, k.GetParams(ctx).SwapRestEndpoint)
	if err != nil {
		return &types.QueryEstimateSwapResponse{result}, err
	}

	k.Logger(ctx).Info(price.String())

	commition := k.GetParams(ctx).SwapCommition

	swapDenom := k.GetParams(ctx).SwapBaseDenom

	k.Logger(ctx).Info(fmt.Sprintf("%f", commition))

	reqCoin := req.Coin
	unit, err := sdk.GetBaseDenom()
	// TODO
	if !(reqCoin.Denom == swapDenom || reqCoin.Denom == unit) {
		return &types.QueryEstimateSwapResponse{result}, status.Error(codes.InvalidArgument, "invalid request")
	}

	// amountDec := sdk.NewDecWithPrec(reqCoin.Amount.Int64(), 0)

	if req.Coin.Denom == unit {
		// decAmount := swapCoin(price, amountDec, commition)
		// // convertCoin asfd -> sfd
		// unit, _ := sdk.GetDenomUnit(swapDenom)
		// result := sdk.DecCoin("sdf", sdk.NewDecWithPrec(decAmount.TruncateInt64(), unit.BigInt().Int64()))
	} else {
		// decAmount := swapDollar(price, amountDec, commition)
		// convertCoin asfl -> sfl

	}

	return &types.QueryEstimateSwapResponse{result}, nil
}
