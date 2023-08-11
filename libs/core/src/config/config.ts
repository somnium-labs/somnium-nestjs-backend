import * as fs from 'fs';
import * as yaml from 'js-yaml';

import { registerAs } from '@nestjs/config';

// YAML 파일을 로드하여 파싱합니다.
const baseConfig = yaml.load(
  fs.readFileSync(`${__dirname}/config.yaml`, 'utf-8'),
);
const envConfig = yaml.load(
  fs.readFileSync(`${__dirname}/config.${process.env.NODE_ENV}.yaml`, 'utf-8'),
);

// @nestjs/config에서 사용할 수 있는 형식으로 변환합니다.
const config = registerAs(
  'config',
  () => Object.assign({}, baseConfig, envConfig), // envConfig가 baseConfig를 덮어씁니다.
);

export default config;
