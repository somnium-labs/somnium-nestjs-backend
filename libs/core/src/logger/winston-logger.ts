import * as moment from 'moment-timezone';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { ConfigService } from '@nestjs/config';

export function createWinstonLogger(configService: ConfigService) {
  return WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        level: process.env.NODE_ENV === 'prod' ? 'info' : 'silly',
        format: winston.format.combine(
          winston.format.timestamp({
            format: () => moment().format('YYYY-MM-DD HH:mm:ss'),
          }),
          nestWinstonModuleUtilities.format.nestLike('Nest', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
      // new ElasticsearchTransport({
      //   level: process.env.NODE_ENV === 'prod' ? 'info' : 'silly',
      //   index: 'somnium-project',
      //   clientOpts: {
      //     node: configService.get('config.elasticsearch.host'),
      //     auth: {
      //       username: configService.get('config.elasticsearch.username'),
      //       password: configService.get('config.elasticsearch.password'),
      //     },
      //     tls: { rejectUnauthorized: false },
      //   },
      // }),
    ],
  });
}
