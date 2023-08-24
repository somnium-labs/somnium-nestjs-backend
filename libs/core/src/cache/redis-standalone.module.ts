import { ConfigModule, ConfigService } from '@nestjs/config';

import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { RedisStandAloneService } from './redis-standalone.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('config.redis.host');
        const port = configService.get<number>('config.redis.port');
        return {
          config: {
            host: host,
            port: port,
          },
        };
      },
    }),
  ],
  providers: [RedisStandAloneService],
  exports: [RedisStandAloneService],
})
export class RedisStandAloneModule {}
