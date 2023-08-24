import {
  AppleAuthRequest,
  AuthResponse,
  FacebookAuthRequest,
  GoogleAuthRequest,
  KakaoAuthRequest,
  LineAuthRequest,
  TwitterAuthRequest,
} from 'proto/auth';

import { ContextUser } from '@api-gateway/auth/jwt/context.user';
import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  GrpcMethod,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { OAuthService } from './oauth.service';

@Controller()
export class OAuthController {
  constructor(
    private readonly logger: Logger,
    private readonly oauthService: OAuthService,
  ) {}

  @GrpcMethod('AuthService', 'googleLogin')
  async googleLogin(request: GoogleAuthRequest): Promise<AuthResponse> {
    return await this.oauthService.googleAuthentication(
      request.idToken,
      request.clientId,
    );
  }

  @GrpcMethod('AuthService', 'kakaoLogin')
  async kakaoLogin(request: KakaoAuthRequest): Promise<AuthResponse> {
    this.logger.log('카카오 인증');
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

  @MessagePattern('logout')
  async rabbitmq(@Payload() user: ContextUser, @Ctx() context: RmqContext) {
    // send의 경우 리턴 값이 있어야 함
    // emit의 경우 없어도 됨
    try {
      await this.oauthService.logout(user.id);
      return true; // send 응답
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
