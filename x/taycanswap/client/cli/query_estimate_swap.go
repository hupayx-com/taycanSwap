package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hupayx-com/taycanSwap/x/taycanswap/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdEstimateSwap() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "estimate-swap [coin]",
		Short: "Query estimateSwap",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			var reqCoin sdk.Coin
			// baseDenom일땐 그냥 쓰고
			reqCoin, err = sdk.ParseCoinNormalized(args[0])

			if err != nil {
				return err
			}

			baseDenom, err := sdk.GetBaseDenom()

			if err != nil {
				return err
			}

			// baseDenom이 아니면 바꿔쓰자..
			if reqCoin.Denom != baseDenom {
				reqDecCoin, _ := sdk.ParseDecCoin(args[0])
				dstUnit, _ := sdk.GetDenomUnit("asfd")
				reqCoin = sdk.NewCoin("asfd", reqDecCoin.Amount.Quo(dstUnit).TruncateInt())
			}

			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryEstimateSwapRequest{
				Coin: reqCoin,
			}

			cmd.Context()

			res, err := queryClient.EstimateSwap(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
