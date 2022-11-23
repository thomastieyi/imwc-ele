/* eslint-disable */
import * as _m0 from "protobufjs/minimal"

export const protobufPackage = "protocol"

export interface nrSrsIqEst {
  channleEstList: channleEst[]
}

export interface channleEst {
  image: number
  real: number
}

function createBasenrSrsIqEst(): nrSrsIqEst {
  return { channleEstList: [] }
}

export const nrSrsIqEst = {
  encode(message: nrSrsIqEst, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.channleEstList) {
      channleEst.encode(v!, writer.uint32(34).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): nrSrsIqEst {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBasenrSrsIqEst()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 4:
          message.channleEstList.push(channleEst.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): nrSrsIqEst {
    return {
      channleEstList: Array.isArray(object?.CHANNLEESTLIST)
        ? object.CHANNLEESTLIST.map((e: any) => channleEst.fromJSON(e))
        : []
    }
  },

  toJSON(message: nrSrsIqEst): unknown {
    const obj: any = {}
    if (message.channleEstList) {
      obj.CHANNLEESTLIST = message.channleEstList.map((e) => (e ? channleEst.toJSON(e) : undefined))
    } else {
      obj.CHANNLEESTLIST = []
    }
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<nrSrsIqEst>, I>>(object: I): nrSrsIqEst {
    const message = createBasenrSrsIqEst()
    message.channleEstList = object.channleEstList?.map((e) => channleEst.fromPartial(e)) || []
    return message
  }
}

function createBasechannleEst(): channleEst {
  return { image: 0, real: 0 }
}

export const channleEst = {
  encode(message: channleEst, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.image !== 0) {
      writer.uint32(8).int32(message.image)
    }
    if (message.real !== 0) {
      writer.uint32(16).int32(message.real)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): channleEst {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBasechannleEst()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.image = reader.int32()
          break
        case 2:
          message.real = reader.int32()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): channleEst {
    return {
      image: isSet(object.image) ? Number(object.image) : 0,
      real: isSet(object.real) ? Number(object.real) : 0
    }
  },

  toJSON(message: channleEst): unknown {
    const obj: any = {}
    message.image !== undefined && (obj.image = Math.round(message.image))
    message.real !== undefined && (obj.real = Math.round(message.real))
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<channleEst>, I>>(object: I): channleEst {
    const message = createBasechannleEst()
    message.image = object.image ?? 0
    message.real = object.real ?? 0
    return message
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

type KeysOfUnion<T> = T extends T ? keyof T : never
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never }

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
