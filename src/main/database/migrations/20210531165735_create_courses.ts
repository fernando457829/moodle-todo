import { Knex } from 'knex';

const tableName = 'courses';

export function up({ schema }: Knex) {
  schema.createTable(tableName, (table) => {
    table.integer('id').primary().unsigned();
    table.string('name').notNullable();
  });
}

export function down({ schema }: Knex) {
  schema.dropTable(tableName);
}
