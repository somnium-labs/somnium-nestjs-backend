import { AxiosModule } from '@core/http/axios.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@core/health/health.module';
import { JWTModule } from '@core/jwt/jwt.module';
import { LoggerModule } from '@core/logger/logger.module';
import { Module } from '@nestjs/common';
import { MongoDBModule } from '@core/database/mongodb.module';
import { OAuthModule } from './oauth/oauth.module';
import { RedisModule } from '@core/cache/redis.module';
import { UserModule } from './user/user.module';
import config from '@core/config/config';

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
