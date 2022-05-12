package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hupayx-com/taycanSwap/x/taycanswap/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdTaycanSwap() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "taycan-swap [coin]",
		Short: "Broadcast message taycanSwap",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			// argCoin, err := sdk.ParseCoinNormalized(args[0])
			argCoin, err := sdk.ParseDecCoin(args[0])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgTaycanSwap(
				clientCtx.GetFromAddress().String(),
				argCoin,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
