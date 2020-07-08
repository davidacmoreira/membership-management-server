// eslint-disable-next-line
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('payments', table => {
    table.increments('id').primary()
    table.date('date').notNullable()
    table.integer('member_id').notNullable().references('id').inTable('members')
    table.integer('fee_id').notNullable().references('id').inTable('fees')
    table.integer('user_id').notNullable().references('id').inTable('users')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('payments')
}
