// eslint-disable-next-line
import Knex from 'knex'

export async function seed (knex: Knex) {
  await knex('users').insert([
    {
      id: 1,
      username: 'admin',
      password: '$2b$10$kJe/YWrU68mWrB2YfKgUPuWP722tjuyIf83lpzZp2xSHU02bggCiS',
      token: ''
    },
    {
      id: 2,
      username: 'user',
      password: '$2b$10$8f4tusLV9uVR/qIXy7.1zu5EDD5th5RS779/lABXXBwifNu9R4tve',
      token: ''
    }
  ])
}
