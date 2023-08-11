import { InjectCluster } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Cluster } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectCluster() readonly cluster: Cluster) {}
}
