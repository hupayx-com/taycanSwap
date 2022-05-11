package keeper_test

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	// "net/http/httptest"
	"testing"
	// sdk "github.com/cosmos/cosmos-sdk/types"
	// testkeeper "github.com/hupayx-com/taycanSwap/testutil/keeper"
	// "github.com/hupayx-com/taycanSwap/x/taycanswap/types"
)

func TestGetPrice(t *testing.T) {

	resp, err := http.Get("https://api.coingecko.com/api/v3/simple/price?ids=hupayx&vs_currencies=usd")
	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()
	respBody, err := ioutil.ReadAll(resp.Body)

	data := make(map[string]interface{})
	err2 := json.Unmarshal(respBody, &data)

	if err2 == nil {
		fmt.Printf("%d %s \n", resp.StatusCode, data)
	}

	usd := data["hupayx"].(map[string]interface{})["usd"]

	fmt.Printf("%f", usd)
}

func TestSwapRate(t *testing.T) {
	fmt.Printf("%f ,", SwapCoin(200))
	fmt.Println(float64(200) * 0.08711)

	fmt.Printf("%f ,", SwapDollar(SwapCoin(200)))
	fmt.Println(float64(17.42) / float64(0.08711))
}

func SwapCoin(amount float64) float64 {
	price := 0.08711
	cnt := float64(amount) * price * 0.98
	return cnt
}

func SwapDollar(amount float64) float64 {
	price := 0.08711
	cnt := float64(amount) / price * 0.98
	return cnt
}
