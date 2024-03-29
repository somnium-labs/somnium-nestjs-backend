import { AuthModule } from '@api-gateway/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { LoggerModule } from '@core/logger/logger.module';
import { Module } from '@nestjs/common';
import { NotificationModule } from '@core/notification/notification.module';
import config from '@core/config/config';

@Module({
  imports: [
    NotificationModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    LoggerModule,
    HealthModule,
  ],
  controllers: [],
})
export class AppModule {}
