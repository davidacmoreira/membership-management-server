// eslint-disable-next-line
import { Request, Response } from 'express'

import knex from '@database/connection'

interface User {
  id: number
  username: string
  password: string
}

class UserController {
  async index (request: Request, response: Response) {
    const { username } = request.query

    const users: User[] = await knex('users')
      .select('*')
      .modify((queryBuilder) => {
        if (username) {
          queryBuilder.where('username', 'like', '%' + String(username) + '%')
        }

        return queryBuilder
      })

    if (users.length) {
      return response.json(users)
    } else {
      return response.status(204).json()
    }
  }

  async show (request: Request, response: Response) {
    const { id } = request.params

    const user: User = await knex('users')
      .where('id', id)
      .select('*').first()

    if (user) {
      return response.json(user)
    } else {
      return response.status(404).json()
    }
  }

  async create (request: Request, response: Response) {
    // eslint-disable-next-line
    const user_id = request.headers.authorization

    const {
      username, password
    } = request.body

    const user = { username, password }

    const [id] = await knex('users').insert(user).returning('id')

    return response.json({ id })
  }
}

export default UserController
