import { Knex } from 'knex';
import path from 'path';

const migrations = require.context(
  path.join(__dirname, 'migrations'),
  false,
  /^\.\/.*\.(t|j)s$/,
);

export default {
  async getMigrations() {
    return migrations.keys().sort();
  },

  getMigrationName(migration) {
    return path.parse(migration).base;
  },

  getMigration(migration) {
    return migrations<Knex.Migration>(migration);
  },
} as Knex.MigrationSource<string>;
