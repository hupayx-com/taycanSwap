/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { DecCoin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "hupayxcom.taycanswap.taycanswap";

export interface MsgTaycanSwap {
  creator: string;
  coin: DecCoin | undefined;
}

export interface MsgTaycanSwapResponse {}

const baseMsgTaycanSwap: object = { creator: "" };

export const MsgTaycanSwap = {
  encode(message: MsgTaycanSwap, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.coin !== undefined) {
      DecCoin.encode(message.coin, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgTaycanSwap {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgTaycanSwap } as MsgTaycanSwap;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.coin = DecCoin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTaycanSwap {
    const message = { ...baseMsgTaycanSwap } as MsgTaycanSwap;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = DecCoin.fromJSON(object.coin);
    } else {
      message.coin = undefined;
    }
    return message;
  },

  toJSON(message: MsgTaycanSwap): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.coin !== undefined &&
      (obj.coin = message.coin ? DecCoin.toJSON(message.coin) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgTaycanSwap>): MsgTaycanSwap {
    const message = { ...baseMsgTaycanSwap } as MsgTaycanSwap;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = DecCoin.fromPartial(object.coin);
    } else {
      message.coin = undefined;
    }
    return message;
  },
};

const baseMsgTaycanSwapResponse: object = {};

export const MsgTaycanSwapResponse = {
  encode(_: MsgTaycanSwapResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgTaycanSwapResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgTaycanSwapResponse } as MsgTaycanSwapResponse;
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

  fromJSON(_: any): MsgTaycanSwapResponse {
    const message = { ...baseMsgTaycanSwapResponse } as MsgTaycanSwapResponse;
    return message;
  },

  toJSON(_: MsgTaycanSwapResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgTaycanSwapResponse>): MsgTaycanSwapResponse {
    const message = { ...baseMsgTaycanSwapResponse } as MsgTaycanSwapResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  TaycanSwap(request: MsgTaycanSwap): Promise<MsgTaycanSwapResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  TaycanSwap(request: MsgTaycanSwap): Promise<MsgTaycanSwapResponse> {
    const data = MsgTaycanSwap.encode(request).finish();
    const promise = this.rpc.request(
      "hupayxcom.taycanswap.taycanswap.Msg",
      "TaycanSwap",
      data
    );
    return promise.then((data) =>
      MsgTaycanSwapResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
