import {
  Body,
  Controller,
  Inject,
  Logger,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  AppleAuthRequestDto,
  AuthResponseDto,
  FacebookAuthRequestDto,
  GoogleAuthRequestDto,
  KakaoAuthRequestDto,
  LineAuthRequestDto,
  TwitterAuthRequestDto,
} from '@api-gateway/auth/auth.dto';

import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { SlackService } from 'nestjs-slack';
import { AuthServiceClientImpl } from 'proto/auth';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private grpcClient: AuthServiceClientImpl;

  constructor(
    private readonly logger: Logger,
    @Inject('GRPC_AUTH') private client: ClientGrpc,
    @Inject('RMQ_AUTH') private readonly rmqClient: ClientProxy,
    @Inject('RMQ_AUTH2') private readonly rmqClient2: ClientProxy,
    private readonly slackService: SlackService,
  ) {}

  async onModuleInit() {
    this.grpcClient =
      this.client.getService<AuthServiceClientImpl>('AuthService');

    await this.rmqClient.connect();
  }

  @Post('google-authentication')
  @ApiOperation({ summary: '구글 인증' })
  async googleAuthentication(
    @Body() dto: GoogleAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.grpcClient.googleLogin({
      idToken: dto.idToken,
      clientId: dto.clientId,
    });
  }

  @Post('kakao-authentication')
  @ApiOperation({ summary: '카카오 인증' })
  async kakaoAuthentication(
    @Body() dto: KakaoAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.grpcClient.kakaoLogin({
      idToken: dto.idToken,
      nonce: dto.nonce,
    });
  }

  @Post('apple-authentication')
  @ApiOperation({ summary: '애플 인증' })
  async appleAuthentication(
    @Body() dto: AppleAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.grpcClient.appleLogin({
      idToken: dto.idToken,
      nonce: dto.nonce,
      audience: dto.audience,
    });
  }

  @Post('line-authentication')
  @ApiOperation({ summary: 'LINE 인증' })
  async lineAuthentication(
    @Body() dto: LineAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.grpcClient.lineLogin({ idToken: dto.idToken });
  }

  @Post('facebook-authentication')
  @ApiOperation({ summary: 'Facebook 인증' })
  async facebookAuthentication(
    @Body() dto: FacebookAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return this.grpcClient.facebookLogin({ accessToken: dto.accessToken });
  }

  @Post('twitter-authentication')
  @ApiOperation({ summary: '트위터 인증' })
  async twitterAuthentication(
    @Body() dto: TwitterAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.grpcClient.twitterLogin({
      authToken: dto.authToken,
      authTokenSecret: dto.authTokenSecret,
    });
  }
}
