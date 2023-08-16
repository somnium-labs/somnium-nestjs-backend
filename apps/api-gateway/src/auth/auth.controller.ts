import {
  Body,
  Controller,
  Delete,
  Inject,
  Logger,
  OnModuleInit,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { ContextUser } from './jwt/context.user';
import { CtxUser } from '@core/decorator/ctx-user.decorator';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { Public } from '@core/decorator/public.decorator';

@ApiTags('유저 API')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController implements OnModuleInit {
  private authGrpcClient: AuthServiceClientImpl;

  constructor(
    private readonly logger: Logger,
    @Inject('GRPC_CLIENT') private grpcClient: ClientGrpc,
    @Inject('RMQ_CLIENT') private readonly rmqClient: ClientProxy,
    private readonly slackService: SlackService,
  ) {}

  async onModuleInit() {
    this.authGrpcClient =
      this.grpcClient.getService<AuthServiceClientImpl>('AuthService');

    await this.rmqClient.connect();
  }

  @Public()
  @Post('google-authentication')
  @ApiOperation({ summary: '구글 인증' })
  async googleAuthentication(
    @Body() dto: GoogleAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.authGrpcClient.googleLogin({
      idToken: dto.idToken,
      clientId: dto.clientId,
    });
  }

  @Public()
  @Post('kakao-authentication')
  @ApiOperation({ summary: '카카오 인증' })
  async kakaoAuthentication(
    @Body() dto: KakaoAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.authGrpcClient.kakaoLogin({
      idToken: dto.idToken,
      nonce: dto.nonce,
    });
  }

  @Public()
  @Post('apple-authentication')
  @ApiOperation({ summary: '애플 인증' })
  async appleAuthentication(
    @Body() dto: AppleAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.authGrpcClient.appleLogin({
      idToken: dto.idToken,
      nonce: dto.nonce,
      audience: dto.audience,
    });
  }

  @Public()
  @Post('line-authentication')
  @ApiOperation({ summary: 'LINE 인증' })
  async lineAuthentication(
    @Body() dto: LineAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.authGrpcClient.lineLogin({ idToken: dto.idToken });
  }

  @Public()
  @Post('facebook-authentication')
  @ApiOperation({ summary: 'Facebook 인증' })
  async facebookAuthentication(
    @Body() dto: FacebookAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return this.authGrpcClient.facebookLogin({ accessToken: dto.accessToken });
  }

  @Public()
  @Post('twitter-authentication')
  @ApiOperation({ summary: '트위터 인증' })
  async twitterAuthentication(
    @Body() dto: TwitterAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.authGrpcClient.twitterLogin({
      authToken: dto.authToken,
      authTokenSecret: dto.authTokenSecret,
    });
  }

  @Delete('logout')
  @ApiOperation({ summary: '로그아웃' })
  async logout(@CtxUser() user: ContextUser) {
    this.rmqClient.send('logout', user).subscribe(async () => {});
  }
}
