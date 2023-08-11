import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { join } from 'path';

@Global()
@Module({})
export class GrpcClientModule {
  static registerFromConfig(name: string, protoPath: string): DynamicModule {
    return {
      module: GrpcClientModule,
      imports: [
        ClientsModule.registerAsync(this.createGrpcClients(name, protoPath)),
      ],
    };
  }

  private static createGrpcClients(name: string, protoPath: string) {
    return [
      {
        name: 'GRPC_CLIENTS',
        useFactory: (configService: ConfigService) => {
          const urls = configService.get(`config.grpc.${name}`);
          return urls.map((url: string) => ({
            transport: Transport.GRPC,
            options: {
              url: url,
              package: name,
              protoPath: join(__dirname, protoPath),
            },
          }));
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
    ];
  }
}
