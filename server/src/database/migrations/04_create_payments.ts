import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('payments', table => {
    table.increments('id').primary()
    table.decimal('date').notNullable()
    table.decimal('member_id').notNullable()
    table.decimal('fee_id').notNullable()
    table.decimal('user_id').notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('payments')
}
