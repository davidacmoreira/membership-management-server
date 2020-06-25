import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('members', table => {
    table.decimal('number').primary()
    table.string('name').notNullable()
    table.string('address').notNullable()
    table.decimal('phone').notNullable()
    table.string('email').notNullable()
    table.string('description').notNullable()
    table.decimal('state').notNullable()
    table.decimal('user_id').notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('members')
}
