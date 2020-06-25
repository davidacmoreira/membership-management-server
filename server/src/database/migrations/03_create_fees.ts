import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('fees', table => {
    table.increments('id').primary()
    table.decimal('year').notNullable()
    table.decimal('month').notNullable()
    table.decimal('value').notNullable()
    table.decimal('user_id').notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('fees')
}
