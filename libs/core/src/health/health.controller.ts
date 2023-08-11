import { Controller, Logger } from '@nestjs/common';
import {
  HealthCheckRequest,
  HealthCheckResponse,
  HealthCheckResponse_ServingStatus,
} from 'proto/health';

import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class HealthController {
  constructor(private readonly logger: Logger) {}

  @GrpcMethod('Health', 'Check')
  checkHealth(request: HealthCheckRequest): HealthCheckResponse {
    // 서버의 상태를 판단하는 로직을 여기에 구현
    // 예를 들어, 데이터베이스 연결 상태 등을 확인할 수 있습니다.
    // 만약 서버가 정상 상태라면 HealthCheckResponse.ServingStatus.SERVING을 반환합니다.
    this.logger.log('HealthController.checkHealth');
    return {
      status: HealthCheckResponse_ServingStatus.SERVING,
    };

    // 서버 상태가 비정상적인 경우 HealthCheckResponse.ServingStatus.NOT_SERVING 등을 반환할 수 있습니다.
  }
}
