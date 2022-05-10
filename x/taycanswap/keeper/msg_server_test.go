package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/hupayx-com/taycanSwap/testutil/keeper"
	"github.com/hupayx-com/taycanSwap/x/taycanswap/keeper"
	"github.com/hupayx-com/taycanSwap/x/taycanswap/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.TaycanswapKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
