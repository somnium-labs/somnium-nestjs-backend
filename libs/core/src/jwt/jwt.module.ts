import { Global, Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get('config.jwt.secret');
        return {
          secret: secret,
          signOptions: {
            expiresIn: configService.get('config.jwt.accessExpiration'),
          },
        };
      },
    }),
  ],
  exports: [JwtModule],
})
export class JWTModule {}
