import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisStandAloneService {
  constructor(@InjectRedis() readonly node: Redis) {}
}
