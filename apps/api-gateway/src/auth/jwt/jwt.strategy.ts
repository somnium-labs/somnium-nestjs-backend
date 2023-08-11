import { ExtractJwt, Strategy } from 'passport-jwt';

import { ContextUser } from './context.user';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더로부터 토큰 추출하는 함수
      secretOrKey: configService.get('config.jwt.secret'),
      ignoreExpiration: false,
    });
  }

  validate(contextUser: ContextUser) {
    return contextUser;
  }
}
