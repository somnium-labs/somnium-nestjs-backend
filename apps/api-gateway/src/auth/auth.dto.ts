import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  readonly refreshToken: string;
}

export class GoogleAuthRequestDto {
  readonly idToken: string;
  readonly clientId: string;
}

export class TwitterAuthRequestDto {
  readonly authToken: string;
  readonly authTokenSecret: string;
}

export class KakaoAuthRequestDto {
  readonly idToken: string;
  readonly nonce: string;
}

export class AppleAuthRequestDto {
  readonly idToken: string;
  readonly nonce: string;
  readonly audience: string;
}

export class LineAuthRequestDto {
  readonly idToken: string;
}

export class FacebookAuthRequestDto {
  readonly accessToken: string;
}

export class EmailPasswordAuthRequestDto {
  @IsEmail()
  @ApiProperty({ example: 'test@example.com' })
  readonly email: string;

  @ApiProperty({ example: 'passw@rd' })
  readonly password: string;
}

export class AuthResponseDto {
  readonly accessToken: string;
  readonly refreshToken: string;
}
