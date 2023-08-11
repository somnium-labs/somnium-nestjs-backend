import {
  AppleAuthRequest,
  AuthResponse,
  FacebookAuthRequest,
  GoogleAuthRequest,
  KakaoAuthRequest,
  LineAuthRequest,
  TwitterAuthRequest,
} from 'proto/auth';

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OAuthService } from './oauth.service';

@Controller()
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @GrpcMethod('AuthService', 'googleLogin')
  async googleLogin(request: GoogleAuthRequest): Promise<AuthResponse> {
    return await this.oauthService.googleAuthentication(
      request.idToken,
      request.clientId,
    );
  }

  @GrpcMethod('AuthService', 'kakaoLogin')
  async kakaoLogin(request: KakaoAuthRequest): Promise<AuthResponse> {
    return await this.oauthService.kakaoAuthentication(
      request.idToken,
      request.nonce,
    );
  }

  @GrpcMethod('AuthService', 'appleLogin')
  async appleLogin(request: AppleAuthRequest): Promise<AuthResponse> {
    return await this.oauthService.appleAuthentication(
      request.idToken,
      request.nonce,
      request.audience,
    );
  }

  @GrpcMethod('AuthService', 'lineLogin')
  async lineLogin(request: LineAuthRequest): Promise<AuthResponse> {
    return await this.oauthService.lineAuthentication(request.idToken);
  }

  @GrpcMethod('AuthService', 'facebookLogin')
  async facebookLogin(request: FacebookAuthRequest): Promise<AuthResponse> {
    return await this.oauthService.facebookAuthentication(request.accessToken);
  }

  @GrpcMethod('AuthService', 'twitterLogin')
  async twitterLogin(request: TwitterAuthRequest): Promise<AuthResponse> {
    return await this.oauthService.twitterAuthentication(
      request.authToken,
      request.authTokenSecret,
    );
  }

  // @MessagePattern('rabbitmq')
  // async rabbitmq(@Payload() data: string, @Ctx() context: RmqContext) {
  //   console.log(data);
  //
  //   // 수동 승인
  //   const channel = context.getChannelRef();
  //   const originalMsg = context.getMessage();
  //   channel.ack(originalMsg);
  //
  //   return 'success';
  // }
}
