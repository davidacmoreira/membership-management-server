// eslint-disable-next-line
import Knex from 'knex'

export async function seed (knex: Knex) {
  await knex('states').insert([
    { id: 0, state: 'inactive' },
    { id: 1, state: 'active' }
  ])
}
