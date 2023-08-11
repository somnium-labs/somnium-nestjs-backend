import { Global, Module, OnModuleInit } from '@nestjs/common';

import { HealthController } from './health.controller';

@Global()
@Module({
  controllers: [HealthController],
})
export class HealthModule implements OnModuleInit {
  onModuleInit() {
    console.log('HealthModule Destroyed');
  }
}
