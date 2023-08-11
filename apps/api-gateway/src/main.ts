import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { createWinstonLogger } from '@core/logger/winston-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = createWinstonLogger(configService);
  app.useLogger(logger);
  app.enableCors({
    origin: '*',
  });

  setupSwagger(app);
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
  SwaggerModule.setup('api', app, document);
}

bootstrap();
