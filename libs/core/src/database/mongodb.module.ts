import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('config.mongodb.uri');
        const dbName = configService.get('config.mongodb.name');
        return {
          uri: uri,
          dbName: dbName,
        };
      },
    }),
  ],
})
export class MongoDBModule {}
