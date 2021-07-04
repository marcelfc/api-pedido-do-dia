import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.STAGE === 'test' ? parseInt(process.env.POSTGRES_PORT_TEST) : parseInt(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [join(__dirname, '..', '**/entities/*.entity.{ts,js}')],
  synchronize: false,
  logging: false,
};

export = config;
