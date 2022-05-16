import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "hupayxcom.taycanswap.taycanswap";
/** Params defines the parameters for the module. */
export interface Params {
    swapPreCommition: string;
    swapPostCommition: string;
    swapRestEndpoint: string;
    swapBaseDenom: string;
    swapTokenId: string;
    swapAmount: string;
    swapEnabled: boolean;
}
export interface Supply {
    SupplyAmount: string;
}
export declare const Params: {
    encode(message: Params, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    fromPartial(object: DeepPartial<Params>): Params;
};
export declare const Supply: {
    encode(message: Supply, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Supply;
    fromJSON(object: any): Supply;
    toJSON(message: Supply): unknown;
    fromPartial(object: DeepPartial<Supply>): Supply;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
