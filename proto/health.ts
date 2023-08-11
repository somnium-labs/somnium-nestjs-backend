/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "grpc.health.v1";

export interface HealthCheckRequest {
}

export interface HealthCheckResponse {
  status: HealthCheckResponse_ServingStatus;
}

export enum HealthCheckResponse_ServingStatus {
  UNKNOWN = 0,
  SERVING = 1,
  NOT_SERVING = 2,
  UNRECOGNIZED = -1,
}

export function healthCheckResponse_ServingStatusFromJSON(object: any): HealthCheckResponse_ServingStatus {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return HealthCheckResponse_ServingStatus.UNKNOWN;
    case 1:
    case "SERVING":
      return HealthCheckResponse_ServingStatus.SERVING;
    case 2:
    case "NOT_SERVING":
      return HealthCheckResponse_ServingStatus.NOT_SERVING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return HealthCheckResponse_ServingStatus.UNRECOGNIZED;
  }
}

export function healthCheckResponse_ServingStatusToJSON(object: HealthCheckResponse_ServingStatus): string {
  switch (object) {
    case HealthCheckResponse_ServingStatus.UNKNOWN:
      return "UNKNOWN";
    case HealthCheckResponse_ServingStatus.SERVING:
      return "SERVING";
    case HealthCheckResponse_ServingStatus.NOT_SERVING:
      return "NOT_SERVING";
    case HealthCheckResponse_ServingStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseHealthCheckRequest(): HealthCheckRequest {
  return {};
}

export const HealthCheckRequest = {
  encode(_: HealthCheckRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HealthCheckRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHealthCheckRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): HealthCheckRequest {
    return {};
  },

  toJSON(_: HealthCheckRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<HealthCheckRequest>, I>>(base?: I): HealthCheckRequest {
    return HealthCheckRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HealthCheckRequest>, I>>(_: I): HealthCheckRequest {
    const message = createBaseHealthCheckRequest();
    return message;
  },
};

function createBaseHealthCheckResponse(): HealthCheckResponse {
  return { status: 0 };
}

export const HealthCheckResponse = {
  encode(message: HealthCheckResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HealthCheckResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHealthCheckResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HealthCheckResponse {
    return { status: isSet(object.status) ? healthCheckResponse_ServingStatusFromJSON(object.status) : 0 };
  },

  toJSON(message: HealthCheckResponse): unknown {
    const obj: any = {};
    if (message.status !== 0) {
      obj.status = healthCheckResponse_ServingStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HealthCheckResponse>, I>>(base?: I): HealthCheckResponse {
    return HealthCheckResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HealthCheckResponse>, I>>(object: I): HealthCheckResponse {
    const message = createBaseHealthCheckResponse();
    message.status = object.status ?? 0;
    return message;
  },
};

export interface Health {
  Check(request: HealthCheckRequest): Promise<HealthCheckResponse>;
}

export const HealthServiceName = "grpc.health.v1.Health";
export class HealthClientImpl implements Health {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || HealthServiceName;
    this.rpc = rpc;
    this.Check = this.Check.bind(this);
  }
  Check(request: HealthCheckRequest): Promise<HealthCheckResponse> {
    const data = HealthCheckRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Check", data);
    return promise.then((data) => HealthCheckResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
