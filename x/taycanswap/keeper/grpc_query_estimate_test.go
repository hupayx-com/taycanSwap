package keeper_test

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	// "net/http/httptest"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	// sdk "github.com/cosmos/cosmos-sdk/types"
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
	fmt.Println(err)

	fmt.Println(respBody)

	data := make(map[string]map[string]float64)
	error2 := json.Unmarshal(respBody, &data)
	if error2 != nil {
		fmt.Println(error2)
	}

	fmt.Println(data["hupayx"]["usd"])

	// usd := data["hupayx"].(map[string]float64)["usd"]

	// fmt.Printf("%f", usd)
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

func TestCoinParser(t *testing.T) {
	if err := sdk.RegisterDenom("sfl", sdk.OneDec()); err != nil {
		panic(err)
	}

	if err := sdk.RegisterDenom("asfl", sdk.NewDecWithPrec(1, 18)); err != nil {
		panic(err)
	}

	reqCoin, err := sdk.ParseCoinNormalized("100sfl")
	testCoin := sdk.NormalizeCoin(reqCoin)
	fmt.Println(sdk.GetBaseDenom())
	if err != nil {
		fmt.Println("--------- error")
	}
	fmt.Println(testCoin)

	reqCoin2, err2 := sdk.ParseCoinNormalized("100xxx")
	testCoin2 := sdk.NormalizeCoin(reqCoin2)
	if err2 != nil {
		fmt.Println("--------- error")
	}
	fmt.Println(testCoin2)

}

func registerCoin() {
	if err := sdk.RegisterDenom("sfl", sdk.OneDec()); err != nil {
		panic(err)
	}

	if err := sdk.RegisterDenom("asfl", sdk.NewDecWithPrec(1, 18)); err != nil {
		panic(err)
	}

	if err := sdk.RegisterDenom("asfd", sdk.NewDecWithPrec(1, 6)); err != nil {
		panic(err)
	}

}

func TestConvertCoin(t *testing.T) {
	registerCoin()

	args := "100sfl"
	reqCoin, _ := sdk.ParseCoinNormalized(args)
	baseDenom, _ := sdk.GetBaseDenom()
	fmt.Println(reqCoin)
	if reqCoin.Denom == baseDenom {
		fmt.Println("baseDenom")
	}

}

func TestConvertCoin2(t *testing.T) {
	registerCoin()
	args := "97.657sfd"
	reqCoin, _ := sdk.ParseDecCoin(args)
	fmt.Println(reqCoin)
	dstUnit, _ := sdk.GetDenomUnit("asfd")
	fmt.Println(dstUnit)
	fmt.Println(reqCoin.Amount.Quo(dstUnit).TruncateInt())
}

func TestSwapCoin(t *testing.T) {
	commition := sdk.NewDecWithPrec(98, 2)
	usdPrice := sdk.NewDecWithPrec(0.1*10000000000, 10)
	amount := sdk.NewDecWithPrec(100, 1)

	coin := swapCoin(usdPrice, amount, commition)
	fmt.Println(coin)
}

func TestSwapDollar(t *testing.T) {
	commition := sdk.NewDecWithPrec(98, 2)
	fmt.Println(commition)
	usdPrice := sdk.NewDecWithPrec(0.1*10000000000, 10)
	fmt.Println(usdPrice)
	amount := sdk.NewDecWithPrec(1, 0)
	fmt.Println(amount)

	coin := swapDollar(usdPrice, amount, commition)
	fmt.Println(coin)
}

func TestDcoin(t *testing.T) {
	usdPrice := sdk.NewDecWithPrec(int64(0.00876*10000000000), 10)
	fmt.Println(usdPrice.BigInt())
}

// func swapCoin(price sdk.Int, amount sdk.Int, commition float64) sdk.Coin {
// 	cnt := int64(amount.Mul(price).ToDec().MustFloat64() * commition)
// 	return sdk.NewCoin("sfd", sdk.NewInt(cnt))
// }

// func swapDollar(price sdk.Int, amount sdk.Int, commition float64) sdk.Coin {
// 	cnt := int64(amount.Quo(price).ToDec().MustFloat64() * commition)
// 	return sdk.NewCoin("sfl", sdk.NewInt(cnt))
// }

func swapCoin(price sdk.Dec, amount sdk.Dec, commition sdk.Dec) sdk.DecCoin {

	cnt := amount.Mul(price).Mul(commition)

	fmt.Println("swapCoin : ----------")
	fmt.Println(cnt)

	return sdk.NewDecCoinFromDec("sfd", cnt)
}

func swapDollar(price sdk.Dec, amount sdk.Dec, commition sdk.Dec) sdk.DecCoin {
	cnt := amount.Quo(price).Mul(commition)

	fmt.Println("swapDollar : ----------")
	fmt.Println(cnt)

	return sdk.NewDecCoinFromDec("sfl", cnt)
}
