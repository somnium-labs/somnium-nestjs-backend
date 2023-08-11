import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LineLogin {
  private readonly audience: string = '2000138625';

  constructor(private readonly httpService: HttpService) {}

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
