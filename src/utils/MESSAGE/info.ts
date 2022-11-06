/* eslint-disable */
import Long from "long"
import * as _m0 from "protobufjs/minimal"

export const protobufPackage = "protocol"

export interface UEInfo {
  UEID: number
  IMSI: string
  SliceID: number
  RNTI: number
  PH: number
  RSRP: number
  dlBler: number
  dlMcs: number
  dlschTotalBytes: number
  TimeStamp: number
}

export interface SliceInfo {
  SliceID: number
  ResourceAllocation: number
  UENum: number
  UEList: UEInfo[]
  Thrpt: number
}

export interface SliceInfoList {
  SliceNum: number
  SliceList: SliceInfo[]
}

function createBaseUEInfo(): UEInfo {
  return {
    UEID: 0,
    IMSI: "",
    SliceID: 0,
    RNTI: 0,
    PH: 0,
    RSRP: 0,
    dlBler: 0,
    dlMcs: 0,
    dlschTotalBytes: 0,
    TimeStamp: 0
  }
}

export const UEInfo = {
  encode(message: UEInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.UEID !== 0) {
      writer.uint32(8).int32(message.UEID)
    }
    if (message.IMSI !== "") {
      writer.uint32(18).string(message.IMSI)
    }
    if (message.SliceID !== 0) {
      writer.uint32(24).int32(message.SliceID)
    }
    if (message.RNTI !== 0) {
      writer.uint32(32).uint32(message.RNTI)
    }
    if (message.PH !== 0) {
      writer.uint32(40).int32(message.PH)
    }
    if (message.RSRP !== 0) {
      writer.uint32(48).int32(message.RSRP)
    }
    if (message.dlBler !== 0) {
      writer.uint32(61).float(message.dlBler)
    }
    if (message.dlMcs !== 0) {
      writer.uint32(64).int32(message.dlMcs)
    }
    if (message.dlschTotalBytes !== 0) {
      writer.uint32(77).float(message.dlschTotalBytes)
    }
    if (message.TimeStamp !== 0) {
      writer.uint32(80).int64(message.TimeStamp)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UEInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseUEInfo()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.UEID = reader.int32()
          break
        case 2:
          message.IMSI = reader.string()
          break
        case 3:
          message.SliceID = reader.int32()
          break
        case 4:
          message.RNTI = reader.uint32()
          break
        case 5:
          message.PH = reader.int32()
          break
        case 6:
          message.RSRP = reader.int32()
          break
        case 7:
          message.dlBler = reader.float()
          break
        case 8:
          message.dlMcs = reader.int32()
          break
        case 9:
          message.dlschTotalBytes = reader.float()
          break
        case 10:
          message.TimeStamp = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): UEInfo {
    return {
      UEID: isSet(object.UEID) ? Number(object.UEID) : 0,
      IMSI: isSet(object.IMSI) ? String(object.IMSI) : "",
      SliceID: isSet(object.SliceID) ? Number(object.SliceID) : 0,
      RNTI: isSet(object.RNTI) ? Number(object.RNTI) : 0,
      PH: isSet(object.PH) ? Number(object.PH) : 0,
      RSRP: isSet(object.RSRP) ? Number(object.RSRP) : 0,
      dlBler: isSet(object.DLBLER) ? Number(object.DLBLER) : 0,
      dlMcs: isSet(object.DLMCS) ? Number(object.DLMCS) : 0,
      dlschTotalBytes: isSet(object.DLSCHTOTALBYTES) ? Number(object.DLSCHTOTALBYTES) : 0,
      TimeStamp: isSet(object.TimeStamp) ? Number(object.TimeStamp) : 0
    }
  },

  toJSON(message: UEInfo): unknown {
    const obj: any = {}
    message.UEID !== undefined && (obj.UEID = Math.round(message.UEID))
    message.IMSI !== undefined && (obj.IMSI = message.IMSI)
    message.SliceID !== undefined && (obj.SliceID = Math.round(message.SliceID))
    message.RNTI !== undefined && (obj.RNTI = Math.round(message.RNTI))
    message.PH !== undefined && (obj.PH = Math.round(message.PH))
    message.RSRP !== undefined && (obj.RSRP = Math.round(message.RSRP))
    message.dlBler !== undefined && (obj.DLBLER = message.dlBler)
    message.dlMcs !== undefined && (obj.DLMCS = Math.round(message.dlMcs))
    message.dlschTotalBytes !== undefined && (obj.DLSCHTOTALBYTES = message.dlschTotalBytes)
    message.TimeStamp !== undefined && (obj.TimeStamp = Math.round(message.TimeStamp))
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<UEInfo>, I>>(object: I): UEInfo {
    const message = createBaseUEInfo()
    message.UEID = object.UEID ?? 0
    message.IMSI = object.IMSI ?? ""
    message.SliceID = object.SliceID ?? 0
    message.RNTI = object.RNTI ?? 0
    message.PH = object.PH ?? 0
    message.RSRP = object.RSRP ?? 0
    message.dlBler = object.dlBler ?? 0
    message.dlMcs = object.dlMcs ?? 0
    message.dlschTotalBytes = object.dlschTotalBytes ?? 0
    message.TimeStamp = object.TimeStamp ?? 0
    return message
  }
}

function createBaseSliceInfo(): SliceInfo {
  return { SliceID: 0, ResourceAllocation: 0, UENum: 0, UEList: [], Thrpt: 0 }
}

export const SliceInfo = {
  encode(message: SliceInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SliceID !== 0) {
      writer.uint32(8).int32(message.SliceID)
    }
    if (message.ResourceAllocation !== 0) {
      writer.uint32(16).int32(message.ResourceAllocation)
    }
    if (message.UENum !== 0) {
      writer.uint32(24).int32(message.UENum)
    }
    for (const v of message.UEList) {
      UEInfo.encode(v!, writer.uint32(34).fork()).ldelim()
    }
    if (message.Thrpt !== 0) {
      writer.uint32(45).float(message.Thrpt)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SliceInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSliceInfo()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.SliceID = reader.int32()
          break
        case 2:
          message.ResourceAllocation = reader.int32()
          break
        case 3:
          message.UENum = reader.int32()
          break
        case 4:
          message.UEList.push(UEInfo.decode(reader, reader.uint32()))
          break
        case 5:
          message.Thrpt = reader.float()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SliceInfo {
    return {
      SliceID: isSet(object.SliceID) ? Number(object.SliceID) : 0,
      ResourceAllocation: isSet(object.ResourceAllocation) ? Number(object.ResourceAllocation) : 0,
      UENum: isSet(object.UENum) ? Number(object.UENum) : 0,
      UEList: Array.isArray(object?.UEList) ? object.UEList.map((e: any) => UEInfo.fromJSON(e)) : [],
      Thrpt: isSet(object.Thrpt) ? Number(object.Thrpt) : 0
    }
  },

  toJSON(message: SliceInfo): unknown {
    const obj: any = {}
    message.SliceID !== undefined && (obj.SliceID = Math.round(message.SliceID))
    message.ResourceAllocation !== undefined && (obj.ResourceAllocation = Math.round(message.ResourceAllocation))
    message.UENum !== undefined && (obj.UENum = Math.round(message.UENum))
    if (message.UEList) {
      obj.UEList = message.UEList.map((e) => (e ? UEInfo.toJSON(e) : undefined))
    } else {
      obj.UEList = []
    }
    message.Thrpt !== undefined && (obj.Thrpt = message.Thrpt)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SliceInfo>, I>>(object: I): SliceInfo {
    const message = createBaseSliceInfo()
    message.SliceID = object.SliceID ?? 0
    message.ResourceAllocation = object.ResourceAllocation ?? 0
    message.UENum = object.UENum ?? 0
    message.UEList = object.UEList?.map((e) => UEInfo.fromPartial(e)) || []
    message.Thrpt = object.Thrpt ?? 0
    return message
  }
}

function createBaseSliceInfoList(): SliceInfoList {
  return { SliceNum: 0, SliceList: [] }
}

export const SliceInfoList = {
  encode(message: SliceInfoList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SliceNum !== 0) {
      writer.uint32(8).int32(message.SliceNum)
    }
    for (const v of message.SliceList) {
      SliceInfo.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SliceInfoList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSliceInfoList()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.SliceNum = reader.int32()
          break
        case 2:
          message.SliceList.push(SliceInfo.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SliceInfoList {
    return {
      SliceNum: isSet(object.SliceNum) ? Number(object.SliceNum) : 0,
      SliceList: Array.isArray(object?.SliceList) ? object.SliceList.map((e: any) => SliceInfo.fromJSON(e)) : []
    }
  },

  toJSON(message: SliceInfoList): unknown {
    const obj: any = {}
    message.SliceNum !== undefined && (obj.SliceNum = Math.round(message.SliceNum))
    if (message.SliceList) {
      obj.SliceList = message.SliceList.map((e) => (e ? SliceInfo.toJSON(e) : undefined))
    } else {
      obj.SliceList = []
    }
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SliceInfoList>, I>>(object: I): SliceInfoList {
    const message = createBaseSliceInfoList()
    message.SliceNum = object.SliceNum ?? 0
    message.SliceList = object.SliceList?.map((e) => SliceInfo.fromPartial(e)) || []
    return message
  }
}

declare var self: any | undefined
declare var window: any | undefined
declare var global: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis
  }
  if (typeof self !== "undefined") {
    return self
  }
  if (typeof window !== "undefined") {
    return window
  }
  if (typeof global !== "undefined") {
    return global
  }
  throw "Unable to locate global object"
})()

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER")
  }
  return long.toNumber()
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
