package taycanswap_test

import (
	"testing"

	keepertest "github.com/hupayx-com/taycanSwap/testutil/keeper"
	"github.com/hupayx-com/taycanSwap/testutil/nullify"
	"github.com/hupayx-com/taycanSwap/x/taycanswap"
	"github.com/hupayx-com/taycanSwap/x/taycanswap/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.TaycanswapKeeper(t)
	taycanswap.InitGenesis(ctx, *k, genesisState)
	got := taycanswap.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
