import * as fs from 'fs';
import * as yaml from 'js-yaml';

import { registerAs } from '@nestjs/config';

const coreConfig = yaml.load(
  fs.readFileSync(`${__dirname}/../../libs/core/config-core.yaml`, 'utf-8'),
);

const baseConfig = yaml.load(
  fs.readFileSync(`${__dirname}/config.yaml`, 'utf-8'),
);
const envConfig = yaml.load(
  fs.readFileSync(`${__dirname}/config.${process.env.NODE_ENV}.yaml`, 'utf-8'),
);

// @nestjs/config에서 사용할 수 있는 형식으로 변환
const config = registerAs(
  'config',
  () => Object.assign({}, coreConfig, baseConfig, envConfig), // 뒤에 있는 설정이 앞의 설정을 덮어 씀
);

export default config;
