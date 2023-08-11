import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleLogin {
  private client = new OAuth2Client();

  async verifyIdToken(idToken: string, clientId: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: idToken,
        audience: clientId,
      });
      const payload = ticket.getPayload();
      const email = payload.email;
      const userId = payload.sub;
      return { success: true, email, userId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
