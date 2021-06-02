import { Knex } from 'knex';

const tableName = 'attachments';

export function up({ schema }: Knex) {
  schema.createTable(tableName, (table) => {
    table.increments('id').primary().unsigned();
    table.string('name').notNullable();
    table.string('url').notNullable();
    table.string('mimetype').notNullable();
    table.integer('assignment_id').references('id').inTable('assignments').onDelete('CASCADE');
  });
}

export function down({ schema }: Knex) {
  schema.dropTable(tableName);
}
