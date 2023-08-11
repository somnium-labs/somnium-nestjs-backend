import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LineLogin {
  private readonly issuer: string = 'https://access.line.me';
  private readonly audience: string = '2000138625';

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async verifyIdToken(idToken: string) {
    try {
      const url = 'https://api.line.me/oauth2/v2.1/verify';
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const { data } = await firstValueFrom(
        this.httpService.post(
          url,
          {
            id_token: idToken,
            client_id: this.audience,
          },
          { headers },
        ),
      );
      const { sub: userId, email } = data;
      return { success: true, email, userId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
