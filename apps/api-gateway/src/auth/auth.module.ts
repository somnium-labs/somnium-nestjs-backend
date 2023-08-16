import * as grpc from '@grpc/grpc-js';

import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { Global, Module } from '@nestjs/common';

import { AuthController } from '@api-gateway/auth/auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { join } from 'path';
import { protobufPackage } from 'proto/auth';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'GRPC_CLIENT',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get('config.grpc.auth'),
            package: protobufPackage,
            protoPath: join(__dirname, '../../proto/auth.proto'),
            credentials: grpc.credentials.createInsecure(), // TLS 비활성화
          },
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'RMQ_CLIENT',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          createRabbitMQ(configService, 'auth'),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy],
})
export class AuthModule {}

function createRabbitMQ(
  configService: ConfigService,
  queue: string,
): ClientProvider {
  const user = configService.get<string>('config.rabbitmq.user');
  const pass = configService.get<string>('config.rabbitmq.pass');
  const cluster = configService.get<{ host: string; port: number }[]>(
    'config.rabbitmq.cluster',
  );
  const urls = cluster.map(
    (cluster) => `amqp://${user}:${pass}@${cluster.host}:${cluster.port}`,
  );
  return {
    transport: Transport.RMQ,
    options: {
      urls: urls,
      queue: queue,
      queueOptions: { durable: false },
    },
  };
}
