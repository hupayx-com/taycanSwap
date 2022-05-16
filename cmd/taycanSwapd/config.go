package main

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func RegisterDenoms() {
	// fmt.Println("registerDenom")

	if err := sdk.RegisterDenom("asfd", sdk.NewDecWithPrec(1, 6)); err != nil {
		panic(err)
	}

	if err := sdk.RegisterDenom("sfl", sdk.OneDec()); err != nil {
		panic(err)
	}

	if err := sdk.RegisterDenom("asfl", sdk.NewDecWithPrec(1, 18)); err != nil {
		panic(err)
	}
}
