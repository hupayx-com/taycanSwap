package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/hupayx-com/taycanSwap/x/taycanswap/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdEstimateSwap() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "estimate-swap [coin]",
		Short: "Broadcast message estimateSwap",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argCoin := args[0]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgEstimateSwap(
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
