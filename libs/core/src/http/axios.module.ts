import * as http from 'http';
import * as https from 'https';

import { Global, Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),
      }),
    }),
  ],
  exports: [HttpModule],
})
export class AxiosModule {}
