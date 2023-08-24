import * as authProto from 'proto/auth';
import * as healthProto from 'proto/health';

import {
  MicroserviceOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ServerCredentials } from '@grpc/grpc-js';
import { createWinstonLogger } from '@core/logger/winston-logger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = createWinstonLogger(configService);
  app.useLogger(logger);

  // microservice #GRPC
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:50000`, // binding address
      package: [authProto.protobufPackage, healthProto.protobufPackage],
      protoPath: [
        join(__dirname, '../../proto/auth.proto'),
        join(__dirname, '../../proto/health.proto'),
      ],
      credentials: ServerCredentials.createInsecure(), // TLS 비활성화
    },
  });

  const user = configService.get('config.rabbitmq.user');
  const pass = configService.get('config.rabbitmq.pass');
  const cluster = configService.get<{ host: string; port: number }[]>(
    'config.rabbitmq.cluster',
  );
  const urls = cluster.map(
    (cluster) => `amqp://${user}:${pass}@${cluster.host}:${cluster.port}`,
  );

  // microservice #RMQ
  for (const queue of ['auth']) {
    app.connectMicroservice<RmqOptions>({
      transport: Transport.RMQ,
      options: {
        urls: urls,
        queue: queue,
        // noAck: false, // 수동 승인 모드
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  await app.startAllMicroservices();

  logger.log(`Application is running`);
}

bootstrap();
