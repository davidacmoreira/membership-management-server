import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('states', table => {
    table.decimal('id').primary()
    table.string('description').notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('states')
}
