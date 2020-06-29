// eslint-disable-next-line
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('members', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('address')
    table.bigInteger('phone')
    table.string('email')
    table.string('description')
    table.string('state').notNullable()
    table.integer('user_id').notNullable().references('id').inTable('users')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('members')
}
