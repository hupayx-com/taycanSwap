package main

import (
	"os"

	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hupayx-com/taycanSwap/app"
	"github.com/tendermint/spm/cosmoscmd"
)

func main() {
	rootCmd, _ := cosmoscmd.NewRootCmd(
		app.Name,
		app.AccountAddressPrefix,
		app.DefaultNodeHome,
		app.Name,
		app.ModuleBasics,
		app.New,
		// this line is used by starport scaffolding # root/arguments
	)
	if err := svrcmd.Execute(rootCmd, app.DefaultNodeHome); err != nil {
		os.Exit(1)
	}
	RegisterDenoms()
}

func RegisterDenoms() {
	if err := sdk.RegisterDenom("sfl", sdk.OneDec()); err != nil {
		panic(err)
	}

	if err := sdk.RegisterDenom("asfl", sdk.NewDecWithPrec(1, 18)); err != nil {
		panic(err)
	}
}
