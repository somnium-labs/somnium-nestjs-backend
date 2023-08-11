import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { GoogleLogin } from './usecase/google.strategy';
import { KakaoLogin } from './usecase/kakao.strategy';
import { TwitterLogin } from './usecase/twitter.strategy';
import { LineLogin } from './usecase/line.strategy';
import { AppleLogin } from './usecase/apple.strategy';
import { FacebookLogin } from './usecase/facebook.strategy';

@Module({
  imports: [],
  controllers: [OAuthController],
  providers: [
    OAuthService,
    GoogleLogin,
    KakaoLogin,
    TwitterLogin,
    LineLogin,
    AppleLogin,
    FacebookLogin,
  ],
  exports: [
    GoogleLogin,
    KakaoLogin,
    TwitterLogin,
    LineLogin,
    AppleLogin,
    FacebookLogin,
  ],
})
export class OAuthModule {}
