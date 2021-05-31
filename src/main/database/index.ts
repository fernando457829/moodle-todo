import knex from 'knex';
import { app } from 'electron';
import path from 'path';

import webpackMigrationSource from './webpackMigrationSource';

export default knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(app.getAppPath(), 'database.sqlite'),
  },

  migrations: {
    tableName: 'migrations',
    migrationSource: webpackMigrationSource,
  },
});
