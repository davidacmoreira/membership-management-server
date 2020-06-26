// eslint-disable-next-line
import Knex from 'knex'

export async function seed (knex: Knex) {
  await knex('states').insert([
    { id: 0, state: 'active' },
    { id: 1, state: 'inactive' }
  ])
}
