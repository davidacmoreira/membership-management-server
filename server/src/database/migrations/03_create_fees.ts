import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('fees', table => {
    table.increments('id').primary()
    table.date('date').notNullable()
    table.decimal('value').notNullable()
    table.integer('user_id').notNullable().references('id').inTable('users')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('fees')
}
