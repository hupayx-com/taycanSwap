/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "hupayxcom.taycanswap.taycanswap";
const baseParams = {
    swapPreCommition: "",
    swapPostCommition: "",
    swapRestEndpoint: "",
    swapBaseDenom: "",
    swapTokenId: "",
    swapAmount: "",
    swapEnabled: false,
};
export const Params = {
    encode(message, writer = Writer.create()) {
        if (message.swapPreCommition !== "") {
            writer.uint32(10).string(message.swapPreCommition);
        }
        if (message.swapPostCommition !== "") {
            writer.uint32(18).string(message.swapPostCommition);
        }
        if (message.swapRestEndpoint !== "") {
            writer.uint32(26).string(message.swapRestEndpoint);
        }
        if (message.swapBaseDenom !== "") {
            writer.uint32(34).string(message.swapBaseDenom);
        }
        if (message.swapTokenId !== "") {
            writer.uint32(42).string(message.swapTokenId);
        }
        if (message.swapAmount !== "") {
            writer.uint32(50).string(message.swapAmount);
        }
        if (message.swapEnabled === true) {
            writer.uint32(56).bool(message.swapEnabled);
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
                    message.swapPreCommition = reader.string();
                    break;
                case 2:
                    message.swapPostCommition = reader.string();
                    break;
                case 3:
                    message.swapRestEndpoint = reader.string();
                    break;
                case 4:
                    message.swapBaseDenom = reader.string();
                    break;
                case 5:
                    message.swapTokenId = reader.string();
                    break;
                case 6:
                    message.swapAmount = reader.string();
                    break;
                case 7:
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
        if (object.swapPreCommition !== undefined &&
            object.swapPreCommition !== null) {
            message.swapPreCommition = String(object.swapPreCommition);
        }
        else {
            message.swapPreCommition = "";
        }
        if (object.swapPostCommition !== undefined &&
            object.swapPostCommition !== null) {
            message.swapPostCommition = String(object.swapPostCommition);
        }
        else {
            message.swapPostCommition = "";
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
        if (object.swapAmount !== undefined && object.swapAmount !== null) {
            message.swapAmount = String(object.swapAmount);
        }
        else {
            message.swapAmount = "";
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
        message.swapPreCommition !== undefined &&
            (obj.swapPreCommition = message.swapPreCommition);
        message.swapPostCommition !== undefined &&
            (obj.swapPostCommition = message.swapPostCommition);
        message.swapRestEndpoint !== undefined &&
            (obj.swapRestEndpoint = message.swapRestEndpoint);
        message.swapBaseDenom !== undefined &&
            (obj.swapBaseDenom = message.swapBaseDenom);
        message.swapTokenId !== undefined &&
            (obj.swapTokenId = message.swapTokenId);
        message.swapAmount !== undefined && (obj.swapAmount = message.swapAmount);
        message.swapEnabled !== undefined &&
            (obj.swapEnabled = message.swapEnabled);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseParams };
        if (object.swapPreCommition !== undefined &&
            object.swapPreCommition !== null) {
            message.swapPreCommition = object.swapPreCommition;
        }
        else {
            message.swapPreCommition = "";
        }
        if (object.swapPostCommition !== undefined &&
            object.swapPostCommition !== null) {
            message.swapPostCommition = object.swapPostCommition;
        }
        else {
            message.swapPostCommition = "";
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
        if (object.swapAmount !== undefined && object.swapAmount !== null) {
            message.swapAmount = object.swapAmount;
        }
        else {
            message.swapAmount = "";
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
const baseSupply = { SupplyAmount: "" };
export const Supply = {
    encode(message, writer = Writer.create()) {
        if (message.SupplyAmount !== "") {
            writer.uint32(10).string(message.SupplyAmount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseSupply };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.SupplyAmount = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseSupply };
        if (object.SupplyAmount !== undefined && object.SupplyAmount !== null) {
            message.SupplyAmount = String(object.SupplyAmount);
        }
        else {
            message.SupplyAmount = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.SupplyAmount !== undefined &&
            (obj.SupplyAmount = message.SupplyAmount);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseSupply };
        if (object.SupplyAmount !== undefined && object.SupplyAmount !== null) {
            message.SupplyAmount = object.SupplyAmount;
        }
        else {
            message.SupplyAmount = "";
        }
        return message;
    },
};
