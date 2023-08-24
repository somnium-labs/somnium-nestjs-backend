import { DynamicModule, Global, Module } from '@nestjs/common';

import { RedisClusterModule } from './redis-cluster.module';
import { RedisClusterService } from './redis-cluster.service';
import { RedisStandAloneModule } from './redis-standalone.module';
import { RedisStandAloneService } from './redis-standalone.service';

@Global()
@Module({
  imports: [...RedisModule.getClusterOrStandAloneModule()],
  providers: [...RedisModule.getProviders()],
  exports: ['REDIS_SERVICE'],
})
export class RedisModule {
  static getClusterOrStandAloneModule(): DynamicModule[] {
    if (process.env.NODE_ENV === 'debug' || process.env.NODE_ENV === 'local') {
      return [
        {
          module: RedisStandAloneModule,
          imports: [RedisStandAloneModule],
        },
      ];
    }
    return [
      {
        module: RedisClusterModule,
        imports: [RedisClusterModule],
      },
    ];
  }

  static getProviders(): any[] {
    if (process.env.NODE_ENV === 'debug' || process.env.NODE_ENV === 'local') {
      return [
        {
          provide: 'REDIS_SERVICE',
          useFactory: (redisStandAloneService: RedisStandAloneService) => {
            return redisStandAloneService;
          },
          inject: [RedisStandAloneService],
        },
      ];
    }
    return [
      {
        provide: 'REDIS_SERVICE',
        useFactory: (redisClusterService: RedisClusterService) => {
          return redisClusterService;
        },
        inject: [RedisClusterService],
      },
    ];
  }
}
