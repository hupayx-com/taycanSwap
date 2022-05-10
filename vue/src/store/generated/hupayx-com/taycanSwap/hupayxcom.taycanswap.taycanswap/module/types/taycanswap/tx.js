/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
export const protobufPackage = "hupayxcom.taycanswap.taycanswap";
const baseMsgEstimateSwap = { creator: "", coin: "" };
export const MsgEstimateSwap = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.coin !== "") {
            writer.uint32(18).string(message.coin);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgEstimateSwap };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.coin = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgEstimateSwap };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.coin !== undefined && object.coin !== null) {
            message.coin = String(object.coin);
        }
        else {
            message.coin = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.coin !== undefined && (obj.coin = message.coin);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgEstimateSwap };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.coin !== undefined && object.coin !== null) {
            message.coin = object.coin;
        }
        else {
            message.coin = "";
        }
        return message;
    },
};
const baseMsgEstimateSwapResponse = {};
export const MsgEstimateSwapResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgEstimateSwapResponse,
        };
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
        const message = {
            ...baseMsgEstimateSwapResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgEstimateSwapResponse,
        };
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    EstimateSwap(request) {
        const data = MsgEstimateSwap.encode(request).finish();
        const promise = this.rpc.request("hupayxcom.taycanswap.taycanswap.Msg", "EstimateSwap", data);
        return promise.then((data) => MsgEstimateSwapResponse.decode(new Reader(data)));
    }
}
