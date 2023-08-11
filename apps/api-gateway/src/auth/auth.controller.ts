import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  AuthResponseDto,
  GoogleAuthRequestDto,
  KakaoAuthRequestDto,
} from '@api-gateway/auth/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google-authentication')
  @ApiOperation({ summary: '구글 인증' })
  async googleAuthentication(
    @Body() dto: GoogleAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.authService.googleLogin(dto.idToken, dto.clientId);
  }

  @Post('kakao-authentication')
  @ApiOperation({ summary: '카카오 인증' })
  async kakaoAuthentication(
    @Body() dto: KakaoAuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.authService.kakaoLogin(dto.idToken, dto.nonce);
  }
}
