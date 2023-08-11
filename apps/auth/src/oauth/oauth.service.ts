import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { GoogleLogin } from './usecase/google.strategy';
import { ConfigService } from '@nestjs/config';
import { InjectCluster } from '@liaoliaots/nestjs-redis';
import { Cluster } from 'ioredis';
import { AuthType, OAuthProvider, UserStatus } from './oauth.enum';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { convertTimeToMilliseconds } from '@core/utility';
import { AppleLogin } from './usecase/apple.strategy';
import { FacebookLogin } from './usecase/facebook.strategy';
import { LineLogin } from './usecase/line.strategy';
import { KakaoLogin } from './usecase/kakao.strategy';
import { TwitterLogin } from './usecase/twitter.strategy';
import { AuthResponse } from 'proto/auth';

@Injectable()
export class OAuthService {
  constructor(
    @InjectCluster() readonly redisCluster: Cluster,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly googleLogin: GoogleLogin,
    private readonly twitterLogin: TwitterLogin,
    private readonly kakaoLogin: KakaoLogin,
    private readonly appleLogin: AppleLogin,
    private readonly lineLogin: LineLogin,
    private readonly facebookLogin: FacebookLogin,
  ) {}

  /**
   * Google 2.0으로 인증
   *
   * @param idToken
   * @param clientId
   * @returns JWT 토큰
   */
  async googleAuthentication(
    idToken: string,
    clientId: string,
  ): Promise<AuthResponse> {
    const result = await this.googleLogin.verifyIdToken(idToken, clientId);
    const user = await this.findOrCreateUser(OAuthProvider.GOOGLE, result);
    return this.generateJwt(user);
  }

  async kakaoAuthentication(idToken: string, nonce: string) {
    const result = await this.kakaoLogin.verifyIdToken(idToken, nonce);
    const user = await this.findOrCreateUser(OAuthProvider.KAKAO, result);
    return this.generateJwt(user);
  }

  /**
   * JWT 토큰 생성
   *
   * @param user
   * @returns
   */
  async generateJwt(user: User) {
    const accessToken = await this.jwtService.signAsync(
      instanceToPlain({
        id: user.id,
        email: user.email,
      }),
    );

    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      {
        expiresIn: this.configService.get<string>(
          'config.jwt.refreshExpiration',
        ),
      },
    );

    const currentRefreshTokenExp = await this.getCurrentRefreshTokenExp();
    await this.userRepository.update(user.id, {
      currentRefreshToken: refreshToken,
      currentRefreshTokenExp: currentRefreshTokenExp,
    });

    return { accessToken, refreshToken };
  }

  /**
   * 소셜로그인 사용자를 찾거나 생성
   *
   * @param provider
   * @param result
   * @returns JWT 토큰
   */
  private async findOrCreateUser(
    provider: OAuthProvider,
    result: {
      success: boolean;
      email?: string;
      userId?: string;
      error?: string;
    },
  ) {
    if (!result.success) {
      this.logger.warn(result.error);
      throw new UnauthorizedException();
    }

    // 사용자가 존재하지 않으면 새로 생성
    const user = await this.userRepository.findByProviderAndUserId(
      provider,
      result.userId,
    );
    if (!user) {
      return await this.userRepository.create(
        plainToClass(User, {
          authType: AuthType.SOCIAL_LOGIN,
          provider: provider,
          userId: result.userId,
          email: result.email,
          userStatus: UserStatus.INACTIVE,
        }),
      );
    }
    return user;
  }

  private async getCurrentRefreshTokenExp(): Promise<Date> {
    return new Date(
      Date.now() +
        convertTimeToMilliseconds(
          this.configService.get<string>('config.jwt.refreshExpiration'),
        ),
    );
  }
}
