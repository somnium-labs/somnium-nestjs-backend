/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "auth";

export enum AuthType {
  EMAIL = 0,
  GOOGLE = 1,
  APPLE = 2,
  FACEBOOK = 3,
  TWITTER = 4,
  KAKAO = 5,
  LINE = 6,
  UNRECOGNIZED = -1,
}

export function authTypeFromJSON(object: any): AuthType {
  switch (object) {
    case 0:
    case "EMAIL":
      return AuthType.EMAIL;
    case 1:
    case "GOOGLE":
      return AuthType.GOOGLE;
    case 2:
    case "APPLE":
      return AuthType.APPLE;
    case 3:
    case "FACEBOOK":
      return AuthType.FACEBOOK;
    case 4:
    case "TWITTER":
      return AuthType.TWITTER;
    case 5:
    case "KAKAO":
      return AuthType.KAKAO;
    case 6:
    case "LINE":
      return AuthType.LINE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuthType.UNRECOGNIZED;
  }
}

export function authTypeToJSON(object: AuthType): string {
  switch (object) {
    case AuthType.EMAIL:
      return "EMAIL";
    case AuthType.GOOGLE:
      return "GOOGLE";
    case AuthType.APPLE:
      return "APPLE";
    case AuthType.FACEBOOK:
      return "FACEBOOK";
    case AuthType.TWITTER:
      return "TWITTER";
    case AuthType.KAKAO:
      return "KAKAO";
    case AuthType.LINE:
      return "LINE";
    case AuthType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface GoogleAuthRequest {
  idToken: string;
  clientId: string;
}

export interface AppleAuthRequest {
  idToken: string;
  nonce: string;
  audience: string;
}

export interface FacebookAuthRequest {
  accessToken: string;
}

export interface TwitterAuthRequest {
  authToken: string;
  authTokenSecret: string;
}

export interface KakaoAuthRequest {
  idToken: string;
  nonce: string;
}

export interface LineAuthRequest {
  idToken: string;
}

function createBaseAuthResponse(): AuthResponse {
  return { accessToken: "", refreshToken: "" };
}

export const AuthResponse = {
  encode(message: AuthResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.refreshToken !== "") {
      writer.uint32(18).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthResponse {
    return {
      accessToken: isSet(object.accessToken) ? String(object.accessToken) : "",
      refreshToken: isSet(object.refreshToken) ? String(object.refreshToken) : "",
    };
  },

  toJSON(message: AuthResponse): unknown {
    const obj: any = {};
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthResponse>, I>>(base?: I): AuthResponse {
    return AuthResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthResponse>, I>>(object: I): AuthResponse {
    const message = createBaseAuthResponse();
    message.accessToken = object.accessToken ?? "";
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

function createBaseGoogleAuthRequest(): GoogleAuthRequest {
  return { idToken: "", clientId: "" };
}

export const GoogleAuthRequest = {
  encode(message: GoogleAuthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.idToken !== "") {
      writer.uint32(10).string(message.idToken);
    }
    if (message.clientId !== "") {
      writer.uint32(18).string(message.clientId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GoogleAuthRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGoogleAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.idToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.clientId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GoogleAuthRequest {
    return {
      idToken: isSet(object.idToken) ? String(object.idToken) : "",
      clientId: isSet(object.clientId) ? String(object.clientId) : "",
    };
  },

  toJSON(message: GoogleAuthRequest): unknown {
    const obj: any = {};
    if (message.idToken !== "") {
      obj.idToken = message.idToken;
    }
    if (message.clientId !== "") {
      obj.clientId = message.clientId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GoogleAuthRequest>, I>>(base?: I): GoogleAuthRequest {
    return GoogleAuthRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GoogleAuthRequest>, I>>(object: I): GoogleAuthRequest {
    const message = createBaseGoogleAuthRequest();
    message.idToken = object.idToken ?? "";
    message.clientId = object.clientId ?? "";
    return message;
  },
};

function createBaseAppleAuthRequest(): AppleAuthRequest {
  return { idToken: "", nonce: "", audience: "" };
}

export const AppleAuthRequest = {
  encode(message: AppleAuthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.idToken !== "") {
      writer.uint32(10).string(message.idToken);
    }
    if (message.nonce !== "") {
      writer.uint32(18).string(message.nonce);
    }
    if (message.audience !== "") {
      writer.uint32(26).string(message.audience);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AppleAuthRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAppleAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.idToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nonce = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.audience = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AppleAuthRequest {
    return {
      idToken: isSet(object.idToken) ? String(object.idToken) : "",
      nonce: isSet(object.nonce) ? String(object.nonce) : "",
      audience: isSet(object.audience) ? String(object.audience) : "",
    };
  },

  toJSON(message: AppleAuthRequest): unknown {
    const obj: any = {};
    if (message.idToken !== "") {
      obj.idToken = message.idToken;
    }
    if (message.nonce !== "") {
      obj.nonce = message.nonce;
    }
    if (message.audience !== "") {
      obj.audience = message.audience;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AppleAuthRequest>, I>>(base?: I): AppleAuthRequest {
    return AppleAuthRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AppleAuthRequest>, I>>(object: I): AppleAuthRequest {
    const message = createBaseAppleAuthRequest();
    message.idToken = object.idToken ?? "";
    message.nonce = object.nonce ?? "";
    message.audience = object.audience ?? "";
    return message;
  },
};

function createBaseFacebookAuthRequest(): FacebookAuthRequest {
  return { accessToken: "" };
}

export const FacebookAuthRequest = {
  encode(message: FacebookAuthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FacebookAuthRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFacebookAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FacebookAuthRequest {
    return { accessToken: isSet(object.accessToken) ? String(object.accessToken) : "" };
  },

  toJSON(message: FacebookAuthRequest): unknown {
    const obj: any = {};
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FacebookAuthRequest>, I>>(base?: I): FacebookAuthRequest {
    return FacebookAuthRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FacebookAuthRequest>, I>>(object: I): FacebookAuthRequest {
    const message = createBaseFacebookAuthRequest();
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseTwitterAuthRequest(): TwitterAuthRequest {
  return { authToken: "", authTokenSecret: "" };
}

export const TwitterAuthRequest = {
  encode(message: TwitterAuthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authToken !== "") {
      writer.uint32(10).string(message.authToken);
    }
    if (message.authTokenSecret !== "") {
      writer.uint32(18).string(message.authTokenSecret);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TwitterAuthRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTwitterAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authTokenSecret = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TwitterAuthRequest {
    return {
      authToken: isSet(object.authToken) ? String(object.authToken) : "",
      authTokenSecret: isSet(object.authTokenSecret) ? String(object.authTokenSecret) : "",
    };
  },

  toJSON(message: TwitterAuthRequest): unknown {
    const obj: any = {};
    if (message.authToken !== "") {
      obj.authToken = message.authToken;
    }
    if (message.authTokenSecret !== "") {
      obj.authTokenSecret = message.authTokenSecret;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TwitterAuthRequest>, I>>(base?: I): TwitterAuthRequest {
    return TwitterAuthRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TwitterAuthRequest>, I>>(object: I): TwitterAuthRequest {
    const message = createBaseTwitterAuthRequest();
    message.authToken = object.authToken ?? "";
    message.authTokenSecret = object.authTokenSecret ?? "";
    return message;
  },
};

function createBaseKakaoAuthRequest(): KakaoAuthRequest {
  return { idToken: "", nonce: "" };
}

export const KakaoAuthRequest = {
  encode(message: KakaoAuthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.idToken !== "") {
      writer.uint32(10).string(message.idToken);
    }
    if (message.nonce !== "") {
      writer.uint32(18).string(message.nonce);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KakaoAuthRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKakaoAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.idToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nonce = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KakaoAuthRequest {
    return {
      idToken: isSet(object.idToken) ? String(object.idToken) : "",
      nonce: isSet(object.nonce) ? String(object.nonce) : "",
    };
  },

  toJSON(message: KakaoAuthRequest): unknown {
    const obj: any = {};
    if (message.idToken !== "") {
      obj.idToken = message.idToken;
    }
    if (message.nonce !== "") {
      obj.nonce = message.nonce;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<KakaoAuthRequest>, I>>(base?: I): KakaoAuthRequest {
    return KakaoAuthRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<KakaoAuthRequest>, I>>(object: I): KakaoAuthRequest {
    const message = createBaseKakaoAuthRequest();
    message.idToken = object.idToken ?? "";
    message.nonce = object.nonce ?? "";
    return message;
  },
};

function createBaseLineAuthRequest(): LineAuthRequest {
  return { idToken: "" };
}

export const LineAuthRequest = {
  encode(message: LineAuthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.idToken !== "") {
      writer.uint32(10).string(message.idToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LineAuthRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLineAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.idToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LineAuthRequest {
    return { idToken: isSet(object.idToken) ? String(object.idToken) : "" };
  },

  toJSON(message: LineAuthRequest): unknown {
    const obj: any = {};
    if (message.idToken !== "") {
      obj.idToken = message.idToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LineAuthRequest>, I>>(base?: I): LineAuthRequest {
    return LineAuthRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LineAuthRequest>, I>>(object: I): LineAuthRequest {
    const message = createBaseLineAuthRequest();
    message.idToken = object.idToken ?? "";
    return message;
  },
};

export interface AuthService {
  googleLogin(request: GoogleAuthRequest): Promise<AuthResponse>;
  kakaoLogin(request: KakaoAuthRequest): Promise<AuthResponse>;
  appleLogin(request: AppleAuthRequest): Promise<AuthResponse>;
  facebookLogin(request: FacebookAuthRequest): Promise<AuthResponse>;
  twitterLogin(request: TwitterAuthRequest): Promise<AuthResponse>;
  lineLogin(request: LineAuthRequest): Promise<AuthResponse>;
}

export const AuthServiceServiceName = "auth.AuthService";
export class AuthServiceClientImpl implements AuthService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || AuthServiceServiceName;
    this.rpc = rpc;
    this.googleLogin = this.googleLogin.bind(this);
    this.kakaoLogin = this.kakaoLogin.bind(this);
    this.appleLogin = this.appleLogin.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.twitterLogin = this.twitterLogin.bind(this);
    this.lineLogin = this.lineLogin.bind(this);
  }
  googleLogin(request: GoogleAuthRequest): Promise<AuthResponse> {
    const data = GoogleAuthRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "googleLogin", data);
    return promise.then((data) => AuthResponse.decode(_m0.Reader.create(data)));
  }

  kakaoLogin(request: KakaoAuthRequest): Promise<AuthResponse> {
    const data = KakaoAuthRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "kakaoLogin", data);
    return promise.then((data) => AuthResponse.decode(_m0.Reader.create(data)));
  }

  appleLogin(request: AppleAuthRequest): Promise<AuthResponse> {
    const data = AppleAuthRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "appleLogin", data);
    return promise.then((data) => AuthResponse.decode(_m0.Reader.create(data)));
  }

  facebookLogin(request: FacebookAuthRequest): Promise<AuthResponse> {
    const data = FacebookAuthRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "facebookLogin", data);
    return promise.then((data) => AuthResponse.decode(_m0.Reader.create(data)));
  }

  twitterLogin(request: TwitterAuthRequest): Promise<AuthResponse> {
    const data = TwitterAuthRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "twitterLogin", data);
    return promise.then((data) => AuthResponse.decode(_m0.Reader.create(data)));
  }

  lineLogin(request: LineAuthRequest): Promise<AuthResponse> {
    const data = LineAuthRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "lineLogin", data);
    return promise.then((data) => AuthResponse.decode(_m0.Reader.create(data)));
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
