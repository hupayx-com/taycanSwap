package cli

import (
	"fmt"
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

			// sfd일때만 asfd로 바꿔주자
			if reqCoin.Denom == "sfd" {
				reqDecCoin, _ := sdk.ParseDecCoin(args[0])
				dstUnit, _ := sdk.GetDenomUnit("asfd")
				reqCoin = sdk.NewCoin("asfd", reqDecCoin.Amount.Quo(dstUnit).TruncateInt())
			}

			baseDenom, err := sdk.GetBaseDenom()
			if err != nil {
				return err
			}

			if !(reqCoin.Denom == baseDenom || reqCoin.Denom == "asfd") {
				return fmt.Errorf(reqCoin.Denom)
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			fmt.Println(reqCoin)

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
