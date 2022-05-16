/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";
export const protobufPackage = "hupayxcom.taycanswap.taycanswap";
const baseMsgTaycanSwap = { creator: "" };
export const MsgTaycanSwap = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.coin !== undefined) {
            Coin.encode(message.coin, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgTaycanSwap };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.coin = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgTaycanSwap };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.coin !== undefined && object.coin !== null) {
            message.coin = Coin.fromJSON(object.coin);
        }
        else {
            message.coin = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.coin !== undefined &&
            (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgTaycanSwap };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.coin !== undefined && object.coin !== null) {
            message.coin = Coin.fromPartial(object.coin);
        }
        else {
            message.coin = undefined;
        }
        return message;
    },
};
const baseMsgTaycanSwapResponse = {};
export const MsgTaycanSwapResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgTaycanSwapResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgTaycanSwapResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgTaycanSwapResponse };
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    TaycanSwap(request) {
        const data = MsgTaycanSwap.encode(request).finish();
        const promise = this.rpc.request("hupayxcom.taycanswap.taycanswap.Msg", "TaycanSwap", data);
        return promise.then((data) => MsgTaycanSwapResponse.decode(new Reader(data)));
    }
}
