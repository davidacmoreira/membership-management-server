// eslint-disable-next-line
import Knex from 'knex'

export async function seed (knex: Knex) {
  await knex('users').insert([
    {
      id: 1,
      username: 'admin',
      password: '$2b$10$kJe/YWrU68mWrB2YfKgUPuWP722tjuyIf83lpzZp2xSHU02bggCiS',
      token: ''
    }
  ])
}
