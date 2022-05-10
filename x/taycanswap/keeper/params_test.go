package keeper_test

import (
	"testing"

	testkeeper "github.com/hupayx-com/taycanSwap/testutil/keeper"
	"github.com/hupayx-com/taycanSwap/x/taycanswap/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.TaycanswapKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
