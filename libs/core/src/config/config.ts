import * as fs from 'fs';
import * as yaml from 'js-yaml';

import { registerAs } from '@nestjs/config';

let baseCoreConfig: {};
let envCoreConfig: {};
let baseAppConfig: {};
let envAppConfig: {};

try {
  baseCoreConfig = yaml.load(
    fs.readFileSync(`${__dirname}/../../libs/core/config.yaml`, 'utf-8'),
  );
} catch (error) {
  baseCoreConfig = {};
}

try {
  envCoreConfig = yaml.load(
    fs.readFileSync(
      `${__dirname}/../../libs/core/config.${process.env.NODE_ENV}.yaml`,
      'utf-8',
    ),
  );
} catch (error) {
  envCoreConfig = {};
}

try {
  baseAppConfig = yaml.load(
    fs.readFileSync(`${__dirname}/config.yaml`, 'utf-8'),
  );
} catch (error) {
  baseAppConfig = {};
}

try {
  envAppConfig = yaml.load(
    fs.readFileSync(
      `${__dirname}/config.${process.env.NODE_ENV}.yaml`,
      'utf-8',
    ),
  );
} catch (error) {
  envAppConfig = {};
}

// @nestjs/config에서 사용할 수 있는 형식으로 변환
const config = registerAs(
  'config',
  () =>
    Object.assign(
      {},
      baseCoreConfig,
      envCoreConfig,
      baseAppConfig,
      envAppConfig,
    ), // 뒤에 있는 설정이 앞의 설정을 덮어 씀
);

export default config;
