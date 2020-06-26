import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('states', table => {
    table.integer('id').primary()
    table.string('state').notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('states')
}
