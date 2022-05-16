package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hupayx-com/taycanSwap/x/taycanswap/types"
)

// GetParams get all parameters as types.Params
func (k Keeper) GetParams(ctx sdk.Context) (params types.Params) {
	k.paramstore.GetParamSet(ctx, &params)
	return params
}

// SetParams set the params
func (k Keeper) SetTokenId(ctx sdk.Context, tokenId string) {
	k.paramstore.Set(ctx, types.ParamStoreKeySwapTokenId, tokenId)
}

// SetParams set the params
func (k Keeper) SetParams(ctx sdk.Context, params types.Params) {
	k.paramstore.SetParamSet(ctx, &params)
}

// SetBaseDenom set's the base fee in the paramSpace
func (k Keeper) SetBaseDenom(ctx sdk.Context, denom string) {
	k.paramstore.Set(ctx, types.ParamStoreKeySwapBaseDenom, denom)
}

// SetSwapCommition set's the base fee in the paramSpace
func (k Keeper) SetSwapPreCommition(ctx sdk.Context, commition float64) {
	k.paramstore.Set(ctx, types.ParamStoreKeySwapPreCommition, commition)
}

// SetSwapCommition set's the base fee in the paramSpace
func (k Keeper) SetSwapAmount(ctx sdk.Context, amount string) {
	k.paramstore.Set(ctx, types.ParamStoreKeySwapAmount, amount)
}

// SetSwapCommition set's the base fee in the paramSpace
func (k Keeper) SetSwapPostCommition(ctx sdk.Context, commition float64) {
	k.paramstore.Set(ctx, types.ParamStoreKeySwapPostCommition, commition)
}

// SetSwapEnabled set's the base fee in the paramSpace
func (k Keeper) SetSwapEnabled(ctx sdk.Context, enableSwap bool) {
	k.paramstore.Set(ctx, types.ParamStoreKeySwapEnabled, enableSwap)
}

// SetSwapRestEndPoint set's the base fee in the paramSpace
func (k Keeper) SetSwapRestEndPoint(ctx sdk.Context, restEndpoint string) {
	k.paramstore.Set(ctx, types.ParamStoreKeySwapRestEndPoint, restEndpoint)
}
