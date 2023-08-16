import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SlackService } from 'nestjs-slack';
import { createWinstonLogger } from '@core/logger/winston-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = createWinstonLogger(configService);
  app.useLogger(logger);
  app.enableCors({
    origin: '*',
  });

  // 모든 컨트롤러 라우트에 접두사를 추가합니다.
  app.setGlobalPrefix('api');

  setupSwagger(app);

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Promise Rejection:', reason);
  });

  process.on('uncaughtException', (error) => {
    const slackService = app.get(SlackService);
    slackService.sendText(`😡${error.toString()}`, { channel: 'notification' });
    logger.error('Uncaught Exception:', error);
  });

  await app.listen(configService.get('config.server.port'));

  logger.log(`Application is running on: ${await app.getUrl()}`);
}

function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('NestJS Study API Docs')
    .setDescription('NestJS Study API description')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      name: 'JWT',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/api', app, document);
}

bootstrap();
