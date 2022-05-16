import { Reader, Writer } from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";
export declare const protobufPackage = "hupayxcom.taycanswap.taycanswap";
export interface MsgTaycanSwap {
    creator: string;
    coin: Coin | undefined;
}
export interface MsgTaycanSwapResponse {
}
export declare const MsgTaycanSwap: {
    encode(message: MsgTaycanSwap, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgTaycanSwap;
    fromJSON(object: any): MsgTaycanSwap;
    toJSON(message: MsgTaycanSwap): unknown;
    fromPartial(object: DeepPartial<MsgTaycanSwap>): MsgTaycanSwap;
};
export declare const MsgTaycanSwapResponse: {
    encode(_: MsgTaycanSwapResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgTaycanSwapResponse;
    fromJSON(_: any): MsgTaycanSwapResponse;
    toJSON(_: MsgTaycanSwapResponse): unknown;
    fromPartial(_: DeepPartial<MsgTaycanSwapResponse>): MsgTaycanSwapResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    TaycanSwap(request: MsgTaycanSwap): Promise<MsgTaycanSwapResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    TaycanSwap(request: MsgTaycanSwap): Promise<MsgTaycanSwapResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
