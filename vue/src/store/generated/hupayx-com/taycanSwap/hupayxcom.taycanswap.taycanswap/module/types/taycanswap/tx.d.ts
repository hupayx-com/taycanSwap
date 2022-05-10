import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "hupayxcom.taycanswap.taycanswap";
export interface MsgEstimateSwap {
    creator: string;
    coin: string;
}
export interface MsgEstimateSwapResponse {
}
export declare const MsgEstimateSwap: {
    encode(message: MsgEstimateSwap, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgEstimateSwap;
    fromJSON(object: any): MsgEstimateSwap;
    toJSON(message: MsgEstimateSwap): unknown;
    fromPartial(object: DeepPartial<MsgEstimateSwap>): MsgEstimateSwap;
};
export declare const MsgEstimateSwapResponse: {
    encode(_: MsgEstimateSwapResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgEstimateSwapResponse;
    fromJSON(_: any): MsgEstimateSwapResponse;
    toJSON(_: MsgEstimateSwapResponse): unknown;
    fromPartial(_: DeepPartial<MsgEstimateSwapResponse>): MsgEstimateSwapResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    EstimateSwap(request: MsgEstimateSwap): Promise<MsgEstimateSwapResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    EstimateSwap(request: MsgEstimateSwap): Promise<MsgEstimateSwapResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
