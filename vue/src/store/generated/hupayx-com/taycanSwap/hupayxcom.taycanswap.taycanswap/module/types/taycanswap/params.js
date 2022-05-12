/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "hupayxcom.taycanswap.taycanswap";
const baseParams = {
    swapCommition: "",
    swapRestEndpoint: "",
    swapBaseDenom: "",
    swapTokenId: "",
    swapEnabled: false,
};
export const Params = {
    encode(message, writer = Writer.create()) {
        if (message.swapCommition !== "") {
            writer.uint32(10).string(message.swapCommition);
        }
        if (message.swapRestEndpoint !== "") {
            writer.uint32(18).string(message.swapRestEndpoint);
        }
        if (message.swapBaseDenom !== "") {
            writer.uint32(26).string(message.swapBaseDenom);
        }
        if (message.swapTokenId !== "") {
            writer.uint32(34).string(message.swapTokenId);
        }
        if (message.swapEnabled === true) {
            writer.uint32(40).bool(message.swapEnabled);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseParams };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.swapCommition = reader.string();
                    break;
                case 2:
                    message.swapRestEndpoint = reader.string();
                    break;
                case 3:
                    message.swapBaseDenom = reader.string();
                    break;
                case 4:
                    message.swapTokenId = reader.string();
                    break;
                case 5:
                    message.swapEnabled = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseParams };
        if (object.swapCommition !== undefined && object.swapCommition !== null) {
            message.swapCommition = String(object.swapCommition);
        }
        else {
            message.swapCommition = "";
        }
        if (object.swapRestEndpoint !== undefined &&
            object.swapRestEndpoint !== null) {
            message.swapRestEndpoint = String(object.swapRestEndpoint);
        }
        else {
            message.swapRestEndpoint = "";
        }
        if (object.swapBaseDenom !== undefined && object.swapBaseDenom !== null) {
            message.swapBaseDenom = String(object.swapBaseDenom);
        }
        else {
            message.swapBaseDenom = "";
        }
        if (object.swapTokenId !== undefined && object.swapTokenId !== null) {
            message.swapTokenId = String(object.swapTokenId);
        }
        else {
            message.swapTokenId = "";
        }
        if (object.swapEnabled !== undefined && object.swapEnabled !== null) {
            message.swapEnabled = Boolean(object.swapEnabled);
        }
        else {
            message.swapEnabled = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.swapCommition !== undefined &&
            (obj.swapCommition = message.swapCommition);
        message.swapRestEndpoint !== undefined &&
            (obj.swapRestEndpoint = message.swapRestEndpoint);
        message.swapBaseDenom !== undefined &&
            (obj.swapBaseDenom = message.swapBaseDenom);
        message.swapTokenId !== undefined &&
            (obj.swapTokenId = message.swapTokenId);
        message.swapEnabled !== undefined &&
            (obj.swapEnabled = message.swapEnabled);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseParams };
        if (object.swapCommition !== undefined && object.swapCommition !== null) {
            message.swapCommition = object.swapCommition;
        }
        else {
            message.swapCommition = "";
        }
        if (object.swapRestEndpoint !== undefined &&
            object.swapRestEndpoint !== null) {
            message.swapRestEndpoint = object.swapRestEndpoint;
        }
        else {
            message.swapRestEndpoint = "";
        }
        if (object.swapBaseDenom !== undefined && object.swapBaseDenom !== null) {
            message.swapBaseDenom = object.swapBaseDenom;
        }
        else {
            message.swapBaseDenom = "";
        }
        if (object.swapTokenId !== undefined && object.swapTokenId !== null) {
            message.swapTokenId = object.swapTokenId;
        }
        else {
            message.swapTokenId = "";
        }
        if (object.swapEnabled !== undefined && object.swapEnabled !== null) {
            message.swapEnabled = object.swapEnabled;
        }
        else {
            message.swapEnabled = false;
        }
        return message;
    },
};
