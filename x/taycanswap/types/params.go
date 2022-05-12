package types

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"gopkg.in/yaml.v2"
)

var (
	ParamStoreKeySwapCommition    = []byte("swapCommition")
	ParamStoreKeySwapRestEndPoint = []byte("SwapRestEndPoint")
	ParamStoreKeySwapBaseDenom    = []byte("SwapBaseDenom")
	ParamStoreKeySwapTokenId      = []byte("SwapTokenId")
	ParamStoreKeySwapEnabled      = []byte("SwapEnabled")
)

var _ paramtypes.ParamSet = (*Params)(nil)

// ParamKeyTable the param key table for launch module
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

// NewParams creates a new Params instance
func NewParams(
	SwapCommition sdk.Dec,
	SwapRestEndPoint string,
	SwapBaseDenom string,
	SwapTokenId string,
	SwapEnabled bool,
) Params {
	return Params{
		SwapCommition:    SwapCommition,
		SwapRestEndpoint: SwapRestEndPoint,
		SwapBaseDenom:    SwapBaseDenom,
		SwapTokenId:      SwapTokenId,
		SwapEnabled:      true,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return Params{
		SwapCommition:    sdk.NewDecWithPrec(98, 2),                                                    // 0.98%
		SwapRestEndpoint: "https://api.coingecko.com/api/v3/simple/price?ids=hupayx&vs_currencies=usd", // coingecko
		SwapBaseDenom:    "asfd",                                                                       // baseDenom -> swapBaseDenom(registed)
		SwapTokenId:      "hupayx",
		SwapEnabled:      true,
	}
}

// ParamSetPairs get the params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(ParamStoreKeySwapCommition, &p.SwapCommition, validateDefault),
		paramtypes.NewParamSetPair(ParamStoreKeySwapRestEndPoint, &p.SwapRestEndpoint, validateDefault),
		paramtypes.NewParamSetPair(ParamStoreKeySwapBaseDenom, &p.SwapBaseDenom, validateDefault),
		paramtypes.NewParamSetPair(ParamStoreKeySwapTokenId, &p.SwapTokenId, validateDefault),
		paramtypes.NewParamSetPair(ParamStoreKeySwapEnabled, &p.SwapEnabled, validateBool),
	}
}

func validateBool(i interface{}) error {
	_, ok := i.(bool)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	return nil
}

func validateDefault(i interface{}) error {
	return nil
}

// Validate validates the set of params
func (p Params) Validate() error {
	return nil
}

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}
