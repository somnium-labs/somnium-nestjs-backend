import { Controller, Get, Logger } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private logger: Logger, private health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  check() {
    // 여러 헬스체크 메커니즘을 배열로 전달 가능
    // 일단 endpoint에 대한 헬스체크만 구현
    this.logger.debug('Health check');
    return this.health.check([]);
  }
}
