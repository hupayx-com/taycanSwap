package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hupayx-com/taycanSwap/x/taycanswap/types"
)

func (k msgServer) EstimateSwap(goCtx context.Context, msg *types.MsgEstimateSwap) (*types.MsgEstimateSwapResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgEstimateSwapResponse{}, nil
}
