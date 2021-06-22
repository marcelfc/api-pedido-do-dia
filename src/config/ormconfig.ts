import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database:
    process.env.STAGE === 'test'
      ? process.env.DB_DATABASE_TEST
      : process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [join(__dirname, '..', '**/entities/*.entity.{ts,js}')],
  synchronize: false,
  logging: false,
};

export = config;
