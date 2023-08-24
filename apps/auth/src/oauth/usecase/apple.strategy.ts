import * as jose from 'jose';

import { Injectable, Logger } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class AppleLogin {
  private readonly issuer: string = 'https://appleid.apple.com';
  private readonly redisCluster: Redis;

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    // private readonly redisService: RedisService,
    private readonly httpService: HttpService,
  ) {
    // this.redisCluster = redisService.node;
  }

  async verifyIdToken(idToken: string, nonce: string, audience: string) {
    try {
      const [encodedHeader] = idToken.split('.');
      const decodedHeader = Buffer.from(encodedHeader, 'base64').toString();
      const header = JSON.parse(decodedHeader);
      const jwk = await this.getJwkFromCacheOrFetch(header.kid);
      const JWKS = jose.createLocalJWKSet({ keys: [jwk] });
      const { payload } = await jose.jwtVerify(idToken, JWKS, {
        issuer: this.issuer,
        audience: audience,
      });

      if (payload.iss !== this.issuer) {
        throw new Error('iss not matched');
      }
      if (payload.aud !== audience) {
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
   *
   *
   * @param kid 공개키 ID
   * @returns jwk
   */
  private async getJwkFromCacheOrFetch(kid: string): Promise<any> {
    let jwks = await this.redisCluster.smembers('apple-jwks');
    let jwk = jwks.find((jwk: any) => JSON.parse(jwk).kid === kid);
    if (jwks.length === 0 || !jwk) {
      const response = await this.httpService.axiosRef.get(
        'https://appleid.apple.com/auth/keys',
      );
      jwks = (response.data.keys as Array<any>).map((key: any) =>
        JSON.stringify(key),
      );
      jwk = jwks.find((jwk: any) => JSON.parse(jwk).kid === kid);

      await this.redisCluster.sadd('apple-jwks', ...jwks);
      await this.redisCluster.expire('apple-jwks', 86400 * 7);
    }
    return JSON.parse(jwk);
  }
}
