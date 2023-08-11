import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FacebookLogin {
  constructor(private readonly httpService: HttpService) {}

  async verifyAccessToken(accessToken: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `https://graph.facebook.com/me?fields=id,email&access_token=${accessToken}`,
        ),
      );
      const { id: userId, email } = data;
      return { success: true, email, userId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
