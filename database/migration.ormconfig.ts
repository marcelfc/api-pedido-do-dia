import { ConnectionOptions } from 'typeorm';
import * as ormconfig from '../src/config/ormconfig';

const config: ConnectionOptions = {
  ...ormconfig,
  logging: true,
  migrations: ['database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'database/migrations',
  },
};

export = config;
