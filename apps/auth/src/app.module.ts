import { RedisModule } from '@core/cache/redis.module';
import config from '@core/config/config';
import { MongoDBModule } from '@core/database/mongodb.module';
import { HealthModule } from '@core/health/health.module';
import { AxiosModule } from '@core/http/axios.module';
import { JWTModule } from '@core/jwt/jwt.module';
import { LoggerModule } from '@core/logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OAuthModule } from './oauth/oauth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    HealthModule,
    AxiosModule,
    RedisModule,
    MongoDBModule,
    JWTModule,
    LoggerModule,

    UserModule,
    OAuthModule,
  ],
})
export class AppModule {}
