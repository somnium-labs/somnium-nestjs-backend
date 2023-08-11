import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';

import { SlackService } from 'nestjs-slack';
import { AuthResponse, AuthServiceClientImpl } from 'proto/auth';

@Injectable()
export class AuthService implements OnModuleInit {
  private grpcClient: AuthServiceClientImpl;

  constructor(
    @Inject('GRPC_AUTH') private client: ClientGrpc,
    @Inject('RMQ_AUTH') private readonly rmqClient: ClientProxy,
    @Inject('RMQ_AUTH2') private readonly rmqClient2: ClientProxy,
    private readonly slackService: SlackService,
  ) {}

  async onModuleInit() {
    this.grpcClient =
      this.client.getService<AuthServiceClientImpl>('AuthService');

    await this.rmqClient.connect();
  }

  async googleLogin(idToken: string, clientId: string): Promise<AuthResponse> {
    // // <!channel> <!here> <!everyone> <!@member-id>
    // this.slackService.sendText('<!channel> hello world', {
    //   channel: 'notification',
    // });
    //
    // this.rmqClient2
    //   .send('rabbitmq', 'rabbitmq')
    //   .subscribe((data) => console.log(data));

    return await this.grpcClient.googleLogin({ idToken, clientId });
  }

  async kakaoLogin(idToken: string, nonce: string): Promise<AuthResponse> {
    return await this.grpcClient.kakaoLogin({ idToken, nonce });
  }

  // async appleAuthentication(idToken: string, nonce: string, audience: string) {}
  //
  // async lineAuthentication(idToken: string) {}
  //
  // async facebookAuthentication(accessToken: string) {}
  //
  // async twitterAuthentication(authToken: string, authTokenSecret: string) {}
}
