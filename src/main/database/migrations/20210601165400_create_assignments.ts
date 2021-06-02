import { Knex } from 'knex';

const tableName = 'assignments';

export function up({ schema }: Knex) {
  schema.createTable(tableName, (table) => {
    table.integer('id').primary().unsigned();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.dateTime('duedate').notNullable();
    table.integer('course_id').references('id').inTable('courses').onDelete('CASCADE');
  });
}

export function down({ schema }: Knex) {
  schema.dropTable(tableName);
}
