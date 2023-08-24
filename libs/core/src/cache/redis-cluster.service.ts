import { InjectCluster } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Cluster } from 'ioredis';

@Injectable()
export class RedisClusterService {
  constructor(@InjectCluster() readonly node: Cluster) {}
}
