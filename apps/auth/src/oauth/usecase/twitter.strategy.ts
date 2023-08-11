import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TwitterLogin {
  private readonly apiKey = this.configService.get(
    'config.oauth.twitter.apiKey',
  );
  private readonly apiSecretKey = this.configService.get(
    'config.oauth.twitter.apiSecretKey',
  );

  constructor(private readonly configService: ConfigService) {}

  async validateToken(oauthToken: string, oauthTokenSecret: string) {
    try {
      const clientWithTokens = new TwitterApi({
        appKey: this.apiKey,
        appSecret: this.apiSecretKey,
        accessToken: oauthToken,
        accessSecret: oauthTokenSecret,
      });

      const response = await clientWithTokens.v1.verifyCredentials({
        include_email: true,
      });
      if (response) {
        const email = response.email;
        const userId = response.id_str;
        return { success: true, email, userId };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
