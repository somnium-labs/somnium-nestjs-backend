import * as grpc from '@grpc/grpc-js';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

import { AuthController } from '@api-gateway/auth/auth.controller';
import { config } from '@api-gateway/config';
import { join } from 'path';
import { protobufPackage } from 'proto/auth';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GRPC_AUTH',
        transport: Transport.GRPC,
        options: {
          url: config.grpc.auth,
          package: protobufPackage,
          protoPath: join(__dirname, '../../proto/auth.proto'),
          credentials: grpc.credentials.createInsecure(), // TLS 비활성화
        },
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'RMQ_AUTH',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const user = configService.get('config.rabbitmq.user');
          const pass = configService.get('config.rabbitmq.pass');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${user}:${pass}@localhost:5672`],
              queue: 'tasks',
              queueOptions: {
                durable: false, // 메세지를 메모리에 저장
              },
            },
          };
        },
      },
      {
        name: 'RMQ_AUTH2',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const user = configService.get('config.rabbitmq.user');
          const pass = configService.get('config.rabbitmq.pass');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${user}:${pass}@localhost:5672`],
              queue: 'tasks2',
              queueOptions: {
                durable: false, // 메세지를 메모리에 저장
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
