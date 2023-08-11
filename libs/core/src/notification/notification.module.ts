import { Global, Module } from '@nestjs/common';
import { SlackModule } from 'nestjs-slack';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    SlackModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const notificationChannel = configService.get(
          'config.slack.webhook.notification',
        );
        return {
          type: 'webhook',
          channels: [
            {
              name: 'notification',
              url: notificationChannel,
            },
          ],
        };
      },
    }),
  ],
  exports: [SlackModule],
})
export class NotificationModule {}
