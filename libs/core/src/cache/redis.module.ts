import { Global, Module } from '@nestjs/common';
import {
  ClusterModule,
  DEFAULT_CLUSTER_NAMESPACE,
} from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClusterNode } from 'ioredis';
import { RedisService } from '@core/cache/redis.service';

@Global()
@Module({
  imports: [
    ClusterModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const nodes = configService.get<ClusterNode[]>('config.redis.cluster');
        return {
          config: [
            {
              namespace: DEFAULT_CLUSTER_NAMESPACE,
              nodes: nodes,
            },
          ],
        };
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
