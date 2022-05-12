package keeper

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	"net/http"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func getPrice(denom string, url string) (error, sdk.Dec) {
	resp, err := http.Get(url)

	if err != nil {
		return err, sdk.NewDec(0)
	}

	defer resp.Body.Close()
	respBody, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return err, sdk.NewDec(0)
	}

	data := make(map[string]map[string]float64)
	error2 := json.Unmarshal(respBody, &data)
	if error2 != nil {
		fmt.Println(error2)
	}

	usdPrice := sdk.NewDecWithPrec(int64(data[denom]["usd"]*10000000000), 10)

	return nil, usdPrice
}

func swapCoin(price sdk.Dec, amount sdk.Dec, commition sdk.Dec) sdk.Dec {
	cnt := amount.Mul(price).Mul(commition)
	return cnt
}

func swapDollar(price sdk.Dec, amount sdk.Dec, commition sdk.Dec) sdk.Dec {
	cnt := amount.Quo(price).Mul(commition)
	return cnt
}
