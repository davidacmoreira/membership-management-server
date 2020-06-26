import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('members', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('address').notNullable()
    table.bigInteger('phone').notNullable()
    table.string('email').notNullable()
    table.string('description').notNullable()
    table.integer('state_id').notNullable().references('id').inTable('states')
    table.integer('user_id').notNullable().references('id').inTable('users')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('members')
}
