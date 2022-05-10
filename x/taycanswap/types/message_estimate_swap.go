package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgEstimateSwap = "estimate_swap"

var _ sdk.Msg = &MsgEstimateSwap{}

func NewMsgEstimateSwap(creator string, coin string) *MsgEstimateSwap {
	return &MsgEstimateSwap{
		Creator: creator,
		Coin:    coin,
	}
}

func (msg *MsgEstimateSwap) Route() string {
	return RouterKey
}

func (msg *MsgEstimateSwap) Type() string {
	return TypeMsgEstimateSwap
}

func (msg *MsgEstimateSwap) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgEstimateSwap) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgEstimateSwap) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
