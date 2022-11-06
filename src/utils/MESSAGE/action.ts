/* eslint-disable */
import Long from "long"
import * as _m0 from "protobufjs/minimal"
import { SliceInfo } from "./info"

export const protobufPackage = "protocol"

export interface RpcRequest {
  ResourceAction: RpcRequest_ResourceActionEnum
  sliceInfoGetMessage: SliceInfoGetMessage | undefined
  sliceInfoCreateMessage: SliceInfoCreateMessage | undefined
  sliceInfoUpdateMessage: SliceInfoUpdateMessage | undefined
  sliceInfoDeleteMessage: SliceInfoDeleteMessage | undefined
  ueMoveMessage: UEMOVEMessage | undefined
}

export enum RpcRequest_ResourceActionEnum {
  NONE_ACTION = 0,
  SLICE_GET_ALL = 1,
  SLICE_CREATE = 2,
  SLICE_UPDATE = 3,
  SLICE_DELETE = 4,
  SLICE_GET = 5,
  SLICE_INIT = 6,
  UE_MOVE = 7,
  CLIENT_KEPP_ALLIVE = 8,
  UNRECOGNIZED = -1
}

export function rpcRequest_ResourceActionEnumFromJSON(object: any): RpcRequest_ResourceActionEnum {
  switch (object) {
    case 0:
    case "NONE_ACTION":
      return RpcRequest_ResourceActionEnum.NONE_ACTION
    case 1:
    case "SLICE_GET_ALL":
      return RpcRequest_ResourceActionEnum.SLICE_GET_ALL
    case 2:
    case "SLICE_CREATE":
      return RpcRequest_ResourceActionEnum.SLICE_CREATE
    case 3:
    case "SLICE_UPDATE":
      return RpcRequest_ResourceActionEnum.SLICE_UPDATE
    case 4:
    case "SLICE_DELETE":
      return RpcRequest_ResourceActionEnum.SLICE_DELETE
    case 5:
    case "SLICE_GET":
      return RpcRequest_ResourceActionEnum.SLICE_GET
    case 6:
    case "SLICE_INIT":
      return RpcRequest_ResourceActionEnum.SLICE_INIT
    case 7:
    case "UE_MOVE":
      return RpcRequest_ResourceActionEnum.UE_MOVE
    case 8:
    case "CLIENT_KEPP_ALLIVE":
      return RpcRequest_ResourceActionEnum.CLIENT_KEPP_ALLIVE
    case -1:
    case "UNRECOGNIZED":
    default:
      return RpcRequest_ResourceActionEnum.UNRECOGNIZED
  }
}

export function rpcRequest_ResourceActionEnumToJSON(object: RpcRequest_ResourceActionEnum): string {
  switch (object) {
    case RpcRequest_ResourceActionEnum.NONE_ACTION:
      return "NONE_ACTION"
    case RpcRequest_ResourceActionEnum.SLICE_GET_ALL:
      return "SLICE_GET_ALL"
    case RpcRequest_ResourceActionEnum.SLICE_CREATE:
      return "SLICE_CREATE"
    case RpcRequest_ResourceActionEnum.SLICE_UPDATE:
      return "SLICE_UPDATE"
    case RpcRequest_ResourceActionEnum.SLICE_DELETE:
      return "SLICE_DELETE"
    case RpcRequest_ResourceActionEnum.SLICE_GET:
      return "SLICE_GET"
    case RpcRequest_ResourceActionEnum.SLICE_INIT:
      return "SLICE_INIT"
    case RpcRequest_ResourceActionEnum.UE_MOVE:
      return "UE_MOVE"
    case RpcRequest_ResourceActionEnum.CLIENT_KEPP_ALLIVE:
      return "CLIENT_KEPP_ALLIVE"
    case RpcRequest_ResourceActionEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED"
  }
}

export interface RpcResponse {
  respStatus: boolean
  respTimeStamp: number
  sliceInfoGetAllResponse: SliceInfoGetAllResponse | undefined
  sliceInfoGetResponse: SliceInfoGetResponse | undefined
  sliceInfoCreateResponse: SliceInfoCreateResponse | undefined
  sliceInfoUpdateResponse: SliceInfoUpdateResponse | undefined
  sliceInfoDeleteResponse: SliceInfoDeleteResponse | undefined
  ueMoveResponse: UEMOVEResponse | undefined
}

export interface SliceInfoGetAllResponse {
  SlicesNum: number
  Slices: SliceInfo[]
}

export interface UEMOVEMessage {
  UEId: number
  SliceId: number
}

export interface UEMOVEResponse {
  success: boolean
}

export interface SliceInfoGetMessage {
  SliceID: number
}

export interface SliceInfoGetResponse {
  SliceResp: SliceInfo | undefined
}

export interface SliceInfoCreateMessage {
  SliceCreated: SliceInfo | undefined
}

export interface SliceInfoCreateResponse {
  success: boolean
}

export interface SliceInfoUpdateMessage {
  SliceUpdated: SliceInfo | undefined
}

export interface SliceInfoUpdateResponse {
  success: boolean
}

export interface SliceInfoDeleteMessage {
  SliceDeleted: SliceInfo | undefined
}

export interface SliceInfoDeleteResponse {
  success: boolean
}

function createBaseRpcRequest(): RpcRequest {
  return {
    ResourceAction: 0,
    sliceInfoGetMessage: undefined,
    sliceInfoCreateMessage: undefined,
    sliceInfoUpdateMessage: undefined,
    sliceInfoDeleteMessage: undefined,
    ueMoveMessage: undefined
  }
}

export const RpcRequest = {
  encode(message: RpcRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ResourceAction !== 0) {
      writer.uint32(8).int32(message.ResourceAction)
    }
    if (message.sliceInfoGetMessage !== undefined) {
      SliceInfoGetMessage.encode(message.sliceInfoGetMessage, writer.uint32(42).fork()).ldelim()
    }
    if (message.sliceInfoCreateMessage !== undefined) {
      SliceInfoCreateMessage.encode(message.sliceInfoCreateMessage, writer.uint32(50).fork()).ldelim()
    }
    if (message.sliceInfoUpdateMessage !== undefined) {
      SliceInfoUpdateMessage.encode(message.sliceInfoUpdateMessage, writer.uint32(58).fork()).ldelim()
    }
    if (message.sliceInfoDeleteMessage !== undefined) {
      SliceInfoDeleteMessage.encode(message.sliceInfoDeleteMessage, writer.uint32(66).fork()).ldelim()
    }
    if (message.ueMoveMessage !== undefined) {
      UEMOVEMessage.encode(message.ueMoveMessage, writer.uint32(74).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RpcRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseRpcRequest()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.ResourceAction = reader.int32() as any
          break
        case 5:
          message.sliceInfoGetMessage = SliceInfoGetMessage.decode(reader, reader.uint32())
          break
        case 6:
          message.sliceInfoCreateMessage = SliceInfoCreateMessage.decode(reader, reader.uint32())
          break
        case 7:
          message.sliceInfoUpdateMessage = SliceInfoUpdateMessage.decode(reader, reader.uint32())
          break
        case 8:
          message.sliceInfoDeleteMessage = SliceInfoDeleteMessage.decode(reader, reader.uint32())
          break
        case 9:
          message.ueMoveMessage = UEMOVEMessage.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): RpcRequest {
    return {
      ResourceAction: isSet(object.ResourceAction) ? rpcRequest_ResourceActionEnumFromJSON(object.ResourceAction) : 0,
      sliceInfoGetMessage: isSet(object.sliceInfoGetMessage)
        ? SliceInfoGetMessage.fromJSON(object.sliceInfoGetMessage)
        : undefined,
      sliceInfoCreateMessage: isSet(object.sliceInfoCreateMessage)
        ? SliceInfoCreateMessage.fromJSON(object.sliceInfoCreateMessage)
        : undefined,
      sliceInfoUpdateMessage: isSet(object.sliceInfoUpdateMessage)
        ? SliceInfoUpdateMessage.fromJSON(object.sliceInfoUpdateMessage)
        : undefined,
      sliceInfoDeleteMessage: isSet(object.sliceInfoDeleteMessage)
        ? SliceInfoDeleteMessage.fromJSON(object.sliceInfoDeleteMessage)
        : undefined,
      ueMoveMessage: isSet(object.ueMoveMessage) ? UEMOVEMessage.fromJSON(object.ueMoveMessage) : undefined
    }
  },

  toJSON(message: RpcRequest): unknown {
    const obj: any = {}
    message.ResourceAction !== undefined &&
      (obj.ResourceAction = rpcRequest_ResourceActionEnumToJSON(message.ResourceAction))
    message.sliceInfoGetMessage !== undefined &&
      (obj.sliceInfoGetMessage = message.sliceInfoGetMessage
        ? SliceInfoGetMessage.toJSON(message.sliceInfoGetMessage)
        : undefined)
    message.sliceInfoCreateMessage !== undefined &&
      (obj.sliceInfoCreateMessage = message.sliceInfoCreateMessage
        ? SliceInfoCreateMessage.toJSON(message.sliceInfoCreateMessage)
        : undefined)
    message.sliceInfoUpdateMessage !== undefined &&
      (obj.sliceInfoUpdateMessage = message.sliceInfoUpdateMessage
        ? SliceInfoUpdateMessage.toJSON(message.sliceInfoUpdateMessage)
        : undefined)
    message.sliceInfoDeleteMessage !== undefined &&
      (obj.sliceInfoDeleteMessage = message.sliceInfoDeleteMessage
        ? SliceInfoDeleteMessage.toJSON(message.sliceInfoDeleteMessage)
        : undefined)
    message.ueMoveMessage !== undefined &&
      (obj.ueMoveMessage = message.ueMoveMessage ? UEMOVEMessage.toJSON(message.ueMoveMessage) : undefined)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<RpcRequest>, I>>(object: I): RpcRequest {
    const message = createBaseRpcRequest()
    message.ResourceAction = object.ResourceAction ?? 0
    message.sliceInfoGetMessage =
      object.sliceInfoGetMessage !== undefined && object.sliceInfoGetMessage !== null
        ? SliceInfoGetMessage.fromPartial(object.sliceInfoGetMessage)
        : undefined
    message.sliceInfoCreateMessage =
      object.sliceInfoCreateMessage !== undefined && object.sliceInfoCreateMessage !== null
        ? SliceInfoCreateMessage.fromPartial(object.sliceInfoCreateMessage)
        : undefined
    message.sliceInfoUpdateMessage =
      object.sliceInfoUpdateMessage !== undefined && object.sliceInfoUpdateMessage !== null
        ? SliceInfoUpdateMessage.fromPartial(object.sliceInfoUpdateMessage)
        : undefined
    message.sliceInfoDeleteMessage =
      object.sliceInfoDeleteMessage !== undefined && object.sliceInfoDeleteMessage !== null
        ? SliceInfoDeleteMessage.fromPartial(object.sliceInfoDeleteMessage)
        : undefined
    message.ueMoveMessage =
      object.ueMoveMessage !== undefined && object.ueMoveMessage !== null
        ? UEMOVEMessage.fromPartial(object.ueMoveMessage)
        : undefined
    return message
  }
}

function createBaseRpcResponse(): RpcResponse {
  return {
    respStatus: false,
    respTimeStamp: 0,
    sliceInfoGetAllResponse: undefined,
    sliceInfoGetResponse: undefined,
    sliceInfoCreateResponse: undefined,
    sliceInfoUpdateResponse: undefined,
    sliceInfoDeleteResponse: undefined,
    ueMoveResponse: undefined
  }
}

export const RpcResponse = {
  encode(message: RpcResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.respStatus === true) {
      writer.uint32(8).bool(message.respStatus)
    }
    if (message.respTimeStamp !== 0) {
      writer.uint32(16).int64(message.respTimeStamp)
    }
    if (message.sliceInfoGetAllResponse !== undefined) {
      SliceInfoGetAllResponse.encode(message.sliceInfoGetAllResponse, writer.uint32(34).fork()).ldelim()
    }
    if (message.sliceInfoGetResponse !== undefined) {
      SliceInfoGetResponse.encode(message.sliceInfoGetResponse, writer.uint32(42).fork()).ldelim()
    }
    if (message.sliceInfoCreateResponse !== undefined) {
      SliceInfoCreateResponse.encode(message.sliceInfoCreateResponse, writer.uint32(50).fork()).ldelim()
    }
    if (message.sliceInfoUpdateResponse !== undefined) {
      SliceInfoUpdateResponse.encode(message.sliceInfoUpdateResponse, writer.uint32(58).fork()).ldelim()
    }
    if (message.sliceInfoDeleteResponse !== undefined) {
      SliceInfoDeleteResponse.encode(message.sliceInfoDeleteResponse, writer.uint32(66).fork()).ldelim()
    }
    if (message.ueMoveResponse !== undefined) {
      UEMOVEResponse.encode(message.ueMoveResponse, writer.uint32(74).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RpcResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseRpcResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.respStatus = reader.bool()
          break
        case 2:
          message.respTimeStamp = longToNumber(reader.int64() as Long)
          break
        case 4:
          message.sliceInfoGetAllResponse = SliceInfoGetAllResponse.decode(reader, reader.uint32())
          break
        case 5:
          message.sliceInfoGetResponse = SliceInfoGetResponse.decode(reader, reader.uint32())
          break
        case 6:
          message.sliceInfoCreateResponse = SliceInfoCreateResponse.decode(reader, reader.uint32())
          break
        case 7:
          message.sliceInfoUpdateResponse = SliceInfoUpdateResponse.decode(reader, reader.uint32())
          break
        case 8:
          message.sliceInfoDeleteResponse = SliceInfoDeleteResponse.decode(reader, reader.uint32())
          break
        case 9:
          message.ueMoveResponse = UEMOVEResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): RpcResponse {
    return {
      respStatus: isSet(object.respStatus) ? Boolean(object.respStatus) : false,
      respTimeStamp: isSet(object.respTimeStamp) ? Number(object.respTimeStamp) : 0,
      sliceInfoGetAllResponse: isSet(object.sliceInfoGetAllResponse)
        ? SliceInfoGetAllResponse.fromJSON(object.sliceInfoGetAllResponse)
        : undefined,
      sliceInfoGetResponse: isSet(object.sliceInfoGetResponse)
        ? SliceInfoGetResponse.fromJSON(object.sliceInfoGetResponse)
        : undefined,
      sliceInfoCreateResponse: isSet(object.sliceInfoCreateResponse)
        ? SliceInfoCreateResponse.fromJSON(object.sliceInfoCreateResponse)
        : undefined,
      sliceInfoUpdateResponse: isSet(object.sliceInfoUpdateResponse)
        ? SliceInfoUpdateResponse.fromJSON(object.sliceInfoUpdateResponse)
        : undefined,
      sliceInfoDeleteResponse: isSet(object.sliceInfoDeleteResponse)
        ? SliceInfoDeleteResponse.fromJSON(object.sliceInfoDeleteResponse)
        : undefined,
      ueMoveResponse: isSet(object.ueMoveResponse) ? UEMOVEResponse.fromJSON(object.ueMoveResponse) : undefined
    }
  },

  toJSON(message: RpcResponse): unknown {
    const obj: any = {}
    message.respStatus !== undefined && (obj.respStatus = message.respStatus)
    message.respTimeStamp !== undefined && (obj.respTimeStamp = Math.round(message.respTimeStamp))
    message.sliceInfoGetAllResponse !== undefined &&
      (obj.sliceInfoGetAllResponse = message.sliceInfoGetAllResponse
        ? SliceInfoGetAllResponse.toJSON(message.sliceInfoGetAllResponse)
        : undefined)
    message.sliceInfoGetResponse !== undefined &&
      (obj.sliceInfoGetResponse = message.sliceInfoGetResponse
        ? SliceInfoGetResponse.toJSON(message.sliceInfoGetResponse)
        : undefined)
    message.sliceInfoCreateResponse !== undefined &&
      (obj.sliceInfoCreateResponse = message.sliceInfoCreateResponse
        ? SliceInfoCreateResponse.toJSON(message.sliceInfoCreateResponse)
        : undefined)
    message.sliceInfoUpdateResponse !== undefined &&
      (obj.sliceInfoUpdateResponse = message.sliceInfoUpdateResponse
        ? SliceInfoUpdateResponse.toJSON(message.sliceInfoUpdateResponse)
        : undefined)
    message.sliceInfoDeleteResponse !== undefined &&
      (obj.sliceInfoDeleteResponse = message.sliceInfoDeleteResponse
        ? SliceInfoDeleteResponse.toJSON(message.sliceInfoDeleteResponse)
        : undefined)
    message.ueMoveResponse !== undefined &&
      (obj.ueMoveResponse = message.ueMoveResponse ? UEMOVEResponse.toJSON(message.ueMoveResponse) : undefined)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<RpcResponse>, I>>(object: I): RpcResponse {
    const message = createBaseRpcResponse()
    message.respStatus = object.respStatus ?? false
    message.respTimeStamp = object.respTimeStamp ?? 0
    message.sliceInfoGetAllResponse =
      object.sliceInfoGetAllResponse !== undefined && object.sliceInfoGetAllResponse !== null
        ? SliceInfoGetAllResponse.fromPartial(object.sliceInfoGetAllResponse)
        : undefined
    message.sliceInfoGetResponse =
      object.sliceInfoGetResponse !== undefined && object.sliceInfoGetResponse !== null
        ? SliceInfoGetResponse.fromPartial(object.sliceInfoGetResponse)
        : undefined
    message.sliceInfoCreateResponse =
      object.sliceInfoCreateResponse !== undefined && object.sliceInfoCreateResponse !== null
        ? SliceInfoCreateResponse.fromPartial(object.sliceInfoCreateResponse)
        : undefined
    message.sliceInfoUpdateResponse =
      object.sliceInfoUpdateResponse !== undefined && object.sliceInfoUpdateResponse !== null
        ? SliceInfoUpdateResponse.fromPartial(object.sliceInfoUpdateResponse)
        : undefined
    message.sliceInfoDeleteResponse =
      object.sliceInfoDeleteResponse !== undefined && object.sliceInfoDeleteResponse !== null
        ? SliceInfoDeleteResponse.fromPartial(object.sliceInfoDeleteResponse)
        : undefined
    message.ueMoveResponse =
      object.ueMoveResponse !== undefined && object.ueMoveResponse !== null
        ? UEMOVEResponse.fromPartial(object.ueMoveResponse)
        : undefined
    return message
  }
}

function createBaseSliceInfoGetAllResponse(): SliceInfoGetAllResponse {
  return { SlicesNum: 0, Slices: [] }
}

export const SliceInfoGetAllResponse = {
  encode(message: SliceInfoGetAllResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SlicesNum !== 0) {
      writer.uint32(8).int32(message.SlicesNum)
    }
    for (const v of message.Slices) {
      SliceInfo.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SliceInfoGetAllResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSliceInfoGetAllResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.SlicesNum = reader.int32()
          break
        case 2:
          message.Slices.push(SliceInfo.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SliceInfoGetAllResponse {
    return {
      SlicesNum: isSet(object.SlicesNum) ? Number(object.SlicesNum) : 0,
      Slices: Array.isArray(object?.Slices) ? object.Slices.map((e: any) => SliceInfo.fromJSON(e)) : []
    }
  },

  toJSON(message: SliceInfoGetAllResponse): unknown {
    const obj: any = {}
    message.SlicesNum !== undefined && (obj.SlicesNum = Math.round(message.SlicesNum))
    if (message.Slices) {
      obj.Slices = message.Slices.map((e) => (e ? SliceInfo.toJSON(e) : undefined))
    } else {
      obj.Slices = []
    }
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SliceInfoGetAllResponse>, I>>(object: I): SliceInfoGetAllResponse {
    const message = createBaseSliceInfoGetAllResponse()
    message.SlicesNum = object.SlicesNum ?? 0
    message.Slices = object.Slices?.map((e) => SliceInfo.fromPartial(e)) || []
    return message
  }
}

function createBaseUEMOVEMessage(): UEMOVEMessage {
  return { UEId: 0, SliceId: 0 }
}

export const UEMOVEMessage = {
  encode(message: UEMOVEMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.UEId !== 0) {
      writer.uint32(8).int32(message.UEId)
    }
    if (message.SliceId !== 0) {
      writer.uint32(16).int32(message.SliceId)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UEMOVEMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseUEMOVEMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.UEId = reader.int32()
          break
        case 2:
          message.SliceId = reader.int32()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): UEMOVEMessage {
    return {
      UEId: isSet(object.UEId) ? Number(object.UEId) : 0,
      SliceId: isSet(object.SliceId) ? Number(object.SliceId) : 0
    }
  },

  toJSON(message: UEMOVEMessage): unknown {
    const obj: any = {}
    message.UEId !== undefined && (obj.UEId = Math.round(message.UEId))
    message.SliceId !== undefined && (obj.SliceId = Math.round(message.SliceId))
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<UEMOVEMessage>, I>>(object: I): UEMOVEMessage {
    const message = createBaseUEMOVEMessage()
    message.UEId = object.UEId ?? 0
    message.SliceId = object.SliceId ?? 0
    return message
  }
}

function createBaseUEMOVEResponse(): UEMOVEResponse {
  return { success: false }
}

export const UEMOVEResponse = {
  encode(message: UEMOVEResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UEMOVEResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseUEMOVEResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): UEMOVEResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false }
  },

  toJSON(message: UEMOVEResponse): unknown {
    const obj: any = {}
    message.success !== undefined && (obj.success = message.success)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<UEMOVEResponse>, I>>(object: I): UEMOVEResponse {
    const message = createBaseUEMOVEResponse()
    message.success = object.success ?? false
    return message
  }
}

function createBaseSliceInfoGetMessage(): SliceInfoGetMessage {
  return { SliceID: 0 }
}

export const SliceInfoGetMessage = {
  encode(message: SliceInfoGetMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SliceID !== 0) {
      writer.uint32(8).int32(message.SliceID)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SliceInfoGetMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSliceInfoGetMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.SliceID = reader.int32()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SliceInfoGetMessage {
    return { SliceID: isSet(object.SliceID) ? Number(object.SliceID) : 0 }
  },

  toJSON(message: SliceInfoGetMessage): unknown {
    const obj: any = {}
    message.SliceID !== undefined && (obj.SliceID = Math.round(message.SliceID))
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SliceInfoGetMessage>, I>>(object: I): SliceInfoGetMessage {
    const message = createBaseSliceInfoGetMessage()
    message.SliceID = object.SliceID ?? 0
    return message
  }
}

function createBaseSliceInfoGetResponse(): SliceInfoGetResponse {
  return { SliceResp: undefined }
}

export const SliceInfoGetResponse = {
  encode(message: SliceInfoGetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SliceResp !== undefined) {
      SliceInfo.encode(message.SliceResp, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SliceInfoGetResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSliceInfoGetResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.SliceResp = SliceInfo.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SliceInfoGetResponse {
    return { SliceResp: isSet(object.SliceResp) ? SliceInfo.fromJSON(object.SliceResp) : undefined }
  },

  toJSON(message: SliceInfoGetResponse): unknown {
    const obj: any = {}
    message.SliceResp !== undefined &&
      (obj.SliceResp = message.SliceResp ? SliceInfo.toJSON(message.SliceResp) : undefined)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SliceInfoGetResponse>, I>>(object: I): SliceInfoGetResponse {
    const message = createBaseSliceInfoGetResponse()
    message.SliceResp =
      object.SliceResp !== undefined && object.SliceResp !== null ? SliceInfo.fromPartial(object.SliceResp) : undefined
    return message
  }
}

function createBaseSliceInfoCreateMessage(): SliceInfoCreateMessage {
  return { SliceCreated: undefined }
}

export const SliceInfoCreateMessage = {
  encode(message: SliceInfoCreateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SliceCreated !== undefined) {
      SliceInfo.encode(message.SliceCreated, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SliceInfoCreateMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSliceInfoCreateMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.SliceCreated = SliceInfo.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SliceInfoCreateMessage {
    return { SliceCreated: isSet(object.SliceCreated) ? SliceInfo.fromJSON(object.SliceCreated) : undefined }
  },

  toJSON(message: SliceInfoCreateMessage): unknown {
    const obj: any = {}
    message.SliceCreated !== undefined &&
      (obj.SliceCreated = message.SliceCreated ? SliceInfo.toJSON(message.SliceCreated) : undefined)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SliceInfoCreateMessage>, I>>(object: I): SliceInfoCreateMessage {
    const message = createBaseSliceInfoCreateMessage()
    message.SliceCreated =
      object.SliceCreated !== undefined && object.SliceCreated !== null
        ? SliceInfo.fromPartial(object.SliceCreated)
        : undefined
    return message
  }
}

function createBaseSliceInfoCreateResponse(): SliceInfoCreateResponse {
  return { success: false }
}

export const SliceInfoCreateResponse = {
  encode(message: SliceInfoCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SliceInfoCreateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSliceInfoCreateResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SliceInfoCreateResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false }
  },

  toJSON(message: SliceInfoCreateResponse): unknown {
    const obj: any = {}
    message.success !== undefined && (obj.success = message.success)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SliceInfoCreateResponse>, I>>(object: I): SliceInfoCreateResponse {
    const message = createBaseSliceInfoCreateResponse()
    message.success = object.success ?? false
    return message
  }
}

function createBaseSliceInfoUpdateMessage(): SliceInfoUpdateMessage {
  return { SliceUpdated: undefined }
}

export const SliceInfoUpdateMessage = {
  encode(message: SliceInfoUpdateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SliceUpdated !== undefined) {
      SliceInfo.encode(message.SliceUpdated, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SliceInfoUpdateMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSliceInfoUpdateMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.SliceUpdated = SliceInfo.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SliceInfoUpdateMessage {
    return { SliceUpdated: isSet(object.SliceUpdated) ? SliceInfo.fromJSON(object.SliceUpdated) : undefined }
  },

  toJSON(message: SliceInfoUpdateMessage): unknown {
    const obj: any = {}
    message.SliceUpdated !== undefined &&
      (obj.SliceUpdated = message.SliceUpdated ? SliceInfo.toJSON(message.SliceUpdated) : undefined)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SliceInfoUpdateMessage>, I>>(object: I): SliceInfoUpdateMessage {
    const message = createBaseSliceInfoUpdateMessage()
    message.SliceUpdated =
      object.SliceUpdated !== undefined && object.SliceUpdated !== null
        ? SliceInfo.fromPartial(object.SliceUpdated)
        : undefined
    return message
  }
}

function createBaseSliceInfoUpdateResponse(): SliceInfoUpdateResponse {
  return { success: false }
}

export const SliceInfoUpdateResponse = {
  encode(message: SliceInfoUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SliceInfoUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSliceInfoUpdateResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SliceInfoUpdateResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false }
  },

  toJSON(message: SliceInfoUpdateResponse): unknown {
    const obj: any = {}
    message.success !== undefined && (obj.success = message.success)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SliceInfoUpdateResponse>, I>>(object: I): SliceInfoUpdateResponse {
    const message = createBaseSliceInfoUpdateResponse()
    message.success = object.success ?? false
    return message
  }
}

function createBaseSliceInfoDeleteMessage(): SliceInfoDeleteMessage {
  return { SliceDeleted: undefined }
}

export const SliceInfoDeleteMessage = {
  encode(message: SliceInfoDeleteMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SliceDeleted !== undefined) {
      SliceInfo.encode(message.SliceDeleted, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SliceInfoDeleteMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSliceInfoDeleteMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.SliceDeleted = SliceInfo.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SliceInfoDeleteMessage {
    return { SliceDeleted: isSet(object.SliceDeleted) ? SliceInfo.fromJSON(object.SliceDeleted) : undefined }
  },

  toJSON(message: SliceInfoDeleteMessage): unknown {
    const obj: any = {}
    message.SliceDeleted !== undefined &&
      (obj.SliceDeleted = message.SliceDeleted ? SliceInfo.toJSON(message.SliceDeleted) : undefined)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SliceInfoDeleteMessage>, I>>(object: I): SliceInfoDeleteMessage {
    const message = createBaseSliceInfoDeleteMessage()
    message.SliceDeleted =
      object.SliceDeleted !== undefined && object.SliceDeleted !== null
        ? SliceInfo.fromPartial(object.SliceDeleted)
        : undefined
    return message
  }
}

function createBaseSliceInfoDeleteResponse(): SliceInfoDeleteResponse {
  return { success: false }
}

export const SliceInfoDeleteResponse = {
  encode(message: SliceInfoDeleteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SliceInfoDeleteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSliceInfoDeleteResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SliceInfoDeleteResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false }
  },

  toJSON(message: SliceInfoDeleteResponse): unknown {
    const obj: any = {}
    message.success !== undefined && (obj.success = message.success)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SliceInfoDeleteResponse>, I>>(object: I): SliceInfoDeleteResponse {
    const message = createBaseSliceInfoDeleteResponse()
    message.success = object.success ?? false
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
