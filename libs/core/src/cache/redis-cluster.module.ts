import {
  ClusterModule,
  DEFAULT_CLUSTER_NAMESPACE,
} from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { ClusterNode } from 'ioredis';
import { RedisClusterService } from './redis-cluster.service';

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
  providers: [RedisClusterService],
  exports: [RedisClusterService],
})
export class RedisClusterModule {}
