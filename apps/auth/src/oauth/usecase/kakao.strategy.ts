import * as jose from 'jose';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cluster, Redis } from 'ioredis';

import { RedisClusterService } from '@core/cache/redis-cluster.service';
import { RedisStandAloneService } from '@core/cache/redis-standalone.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KakaoLogin {
  private readonly issuer: string = 'https://kauth.kakao.com';
  private readonly audience: string;
  private readonly redis: Redis | Cluster;

  constructor(
    @Inject('REDIS_SERVICE')
    redisService: RedisStandAloneService | RedisClusterService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,

    private readonly httpService: HttpService,
  ) {
    this.audience = this.configService.get('config.oauth.kakao.appKey');
    this.redis = redisService.node;
  }

  async verifyIdToken(idToken: string, nonce: string) {
    try {
      const [encodedHeader] = idToken.split('.');
      const decodedHeader = Buffer.from(encodedHeader, 'base64').toString();
      const header = JSON.parse(decodedHeader);
      const jwk = await this.getJwkFromCacheOrFetch(header.kid);
      const JWKS = jose.createLocalJWKSet({ keys: [jwk] });
      const { payload } = await jose.jwtVerify(idToken, JWKS, {
        issuer: this.issuer,
        audience: this.audience,
      });

      if (payload.iss !== this.issuer) {
        throw new Error('iss not matched');
      }
      if (payload.aud !== this.audience) {
        throw new Error('aud not matched');
      }
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        throw new Error('exp not matched');
      }
      if (payload['nonce'] !== nonce) {
        throw new Error('nonce not matched');
      }

      const email = payload['email'] as string;
      const userId = payload.sub;
      return { success: true, email, userId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * OIDC: 공개키 목록 조회하기를 통해 카카오 인증 서버가 서명 시 사용하는 공개키 목록 조회
   * 공개키 목록은 7일간 캐시
   *
   * @param kid 공개키 ID
   * @returns jwk
   */
  private async getJwkFromCacheOrFetch(kid: string): Promise<any> {
    let jwks = await this.redis.smembers('kakao-jwks');
    let jwk = jwks.find((jwk: any) => JSON.parse(jwk).kid === kid);
    if (jwks.length === 0 || !jwk) {
      const response = await this.httpService.axiosRef.get(
        'https://kauth.kakao.com/.well-known/jwks.json',
      );
      jwks = (response.data.keys as Array<any>).map((key: any) =>
        JSON.stringify(key),
      );
      jwk = jwks.find((jwk: any) => JSON.parse(jwk).kid === kid);

      await this.redis.sadd('kakao-jwks', ...jwks);
      await this.redis.expire('kakao-jwks', 86400 * 7);
    }
    return JSON.parse(jwk);
  }
}
