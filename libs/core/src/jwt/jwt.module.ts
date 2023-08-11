import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('config.jwt.secret'),
        signOptions: {
          expiresIn: configService.get('config.jwt.accessExpiration'),
        },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class JWTModule {}
