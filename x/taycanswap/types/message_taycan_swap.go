package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgTaycanSwap = "taycan_swap"

var _ sdk.Msg = &MsgTaycanSwap{}

func NewMsgTaycanSwap(creator string, coin sdk.DecCoin) *MsgTaycanSwap {
	return &MsgTaycanSwap{
		Creator: creator,
		Coin:    coin,
	}
}

func (msg *MsgTaycanSwap) Route() string {
	return RouterKey
}

func (msg *MsgTaycanSwap) Type() string {
	return TypeMsgTaycanSwap
}

func (msg *MsgTaycanSwap) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgTaycanSwap) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgTaycanSwap) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
