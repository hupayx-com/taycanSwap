import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../taycanswap/params";
import { Coin, DecCoin } from "../cosmos/base/v1beta1/coin";
export declare const protobufPackage = "hupayxcom.taycanswap.taycanswap";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params: Params | undefined;
}
export interface QueryEstimateSwapRequest {
    coin: Coin | undefined;
}
export interface QueryEstimateSwapResponse {
    coin: DecCoin | undefined;
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse;
};
export declare const QueryEstimateSwapRequest: {
    encode(message: QueryEstimateSwapRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryEstimateSwapRequest;
    fromJSON(object: any): QueryEstimateSwapRequest;
    toJSON(message: QueryEstimateSwapRequest): unknown;
    fromPartial(object: DeepPartial<QueryEstimateSwapRequest>): QueryEstimateSwapRequest;
};
export declare const QueryEstimateSwapResponse: {
    encode(message: QueryEstimateSwapResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryEstimateSwapResponse;
    fromJSON(object: any): QueryEstimateSwapResponse;
    toJSON(message: QueryEstimateSwapResponse): unknown;
    fromPartial(object: DeepPartial<QueryEstimateSwapResponse>): QueryEstimateSwapResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Parameters queries the parameters of the module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Queries a list of estimateSwap items. */
    EstimateSwap(request: QueryEstimateSwapRequest): Promise<QueryEstimateSwapResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    EstimateSwap(request: QueryEstimateSwapRequest): Promise<QueryEstimateSwapResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
