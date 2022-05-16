/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../taycanswap/params";
import { Coin, DecCoin } from "../cosmos/base/v1beta1/coin";
export const protobufPackage = "hupayxcom.taycanswap.taycanswap";
const baseQueryParamsRequest = {};
export const QueryParamsRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsRequest };
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
        const message = { ...baseQueryParamsRequest };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryParamsRequest };
        return message;
    },
};
const baseQueryParamsResponse = {};
export const QueryParamsResponse = {
    encode(message, writer = Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryParamsResponse };
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromJSON(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined &&
            (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryParamsResponse };
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromPartial(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
};
const baseQueryEstimateSwapRequest = {};
export const QueryEstimateSwapRequest = {
    encode(message, writer = Writer.create()) {
        if (message.coin !== undefined) {
            Coin.encode(message.coin, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryEstimateSwapRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = {
            ...baseQueryEstimateSwapRequest,
        };
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
        message.coin !== undefined &&
            (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryEstimateSwapRequest,
        };
        if (object.coin !== undefined && object.coin !== null) {
            message.coin = Coin.fromPartial(object.coin);
        }
        else {
            message.coin = undefined;
        }
        return message;
    },
};
const baseQueryEstimateSwapResponse = {};
export const QueryEstimateSwapResponse = {
    encode(message, writer = Writer.create()) {
        if (message.coin !== undefined) {
            DecCoin.encode(message.coin, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryEstimateSwapResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.coin = DecCoin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryEstimateSwapResponse,
        };
        if (object.coin !== undefined && object.coin !== null) {
            message.coin = DecCoin.fromJSON(object.coin);
        }
        else {
            message.coin = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.coin !== undefined &&
            (obj.coin = message.coin ? DecCoin.toJSON(message.coin) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryEstimateSwapResponse,
        };
        if (object.coin !== undefined && object.coin !== null) {
            message.coin = DecCoin.fromPartial(object.coin);
        }
        else {
            message.coin = undefined;
        }
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Params(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("hupayxcom.taycanswap.taycanswap.Query", "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
    }
    EstimateSwap(request) {
        const data = QueryEstimateSwapRequest.encode(request).finish();
        const promise = this.rpc.request("hupayxcom.taycanswap.taycanswap.Query", "EstimateSwap", data);
        return promise.then((data) => QueryEstimateSwapResponse.decode(new Reader(data)));
    }
}
