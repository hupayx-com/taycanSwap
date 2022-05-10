/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";

export const protobufPackage = "hupayxcom.taycanswap.taycanswap";

export interface MsgEstimateSwap {
  creator: string;
  coin: string;
}

export interface MsgEstimateSwapResponse {}

const baseMsgEstimateSwap: object = { creator: "", coin: "" };

export const MsgEstimateSwap = {
  encode(message: MsgEstimateSwap, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.coin !== "") {
      writer.uint32(18).string(message.coin);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgEstimateSwap {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgEstimateSwap } as MsgEstimateSwap;
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

  fromJSON(object: any): MsgEstimateSwap {
    const message = { ...baseMsgEstimateSwap } as MsgEstimateSwap;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = String(object.coin);
    } else {
      message.coin = "";
    }
    return message;
  },

  toJSON(message: MsgEstimateSwap): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.coin !== undefined && (obj.coin = message.coin);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgEstimateSwap>): MsgEstimateSwap {
    const message = { ...baseMsgEstimateSwap } as MsgEstimateSwap;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = object.coin;
    } else {
      message.coin = "";
    }
    return message;
  },
};

const baseMsgEstimateSwapResponse: object = {};

export const MsgEstimateSwapResponse = {
  encode(_: MsgEstimateSwapResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgEstimateSwapResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgEstimateSwapResponse,
    } as MsgEstimateSwapResponse;
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

  fromJSON(_: any): MsgEstimateSwapResponse {
    const message = {
      ...baseMsgEstimateSwapResponse,
    } as MsgEstimateSwapResponse;
    return message;
  },

  toJSON(_: MsgEstimateSwapResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgEstimateSwapResponse>
  ): MsgEstimateSwapResponse {
    const message = {
      ...baseMsgEstimateSwapResponse,
    } as MsgEstimateSwapResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  EstimateSwap(request: MsgEstimateSwap): Promise<MsgEstimateSwapResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  EstimateSwap(request: MsgEstimateSwap): Promise<MsgEstimateSwapResponse> {
    const data = MsgEstimateSwap.encode(request).finish();
    const promise = this.rpc.request(
      "hupayxcom.taycanswap.taycanswap.Msg",
      "EstimateSwap",
      data
    );
    return promise.then((data) =>
      MsgEstimateSwapResponse.decode(new Reader(data))
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
