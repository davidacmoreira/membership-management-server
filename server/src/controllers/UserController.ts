// eslint-disable-next-line
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import knex from '@database/connection'

interface User {
  id: number
  username: string
}

const createHash = async (password: string) => {
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)

  return hash
}

class UserController {
  async index (request: Request, response: Response) {
    const userId = Number(request.headers.user_id)

    if (userId === 1) {
      const { username } = request.query

      const users: User[] = await knex('users')
        .select(['id', 'username'])
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
    } else {
      return response.status(400).json({ message: 'no permission' })
    }
  }

  async show (request: Request, response: Response) {
    const userId = Number(request.headers.user_id)

    if (userId === 1) {
      const { id } = request.params

      const user: User = await knex('users')
        .where('id', id)
        .select(['id', 'username'])
        .first()

      if (user) {
        return response.json(user)
      } else {
        return response.status(404).json()
      }
    } else {
      return response.status(400).json({ message: 'no permission' })
    }
  }

  async create (request: Request, response: Response) {
    const userId = Number(request.headers.user_id)

    if (userId === 1) {
      const hash = await createHash(request.body.password)

      delete request.body.password

      const userExists = await knex('users')
        .where('username', request.body.username)
        .select(['id'])
        .first()

      if (userExists) {
        return response.status(400).json({ message: 'user already exists' })
      } else {
        const user = {
          username: request.body.username,
          password: hash,
          token: ''
        }

        const [id] = await knex('users')
          .insert(user)
          .returning('id')

        return response.status(201).json({ id })
      }
    } else {
      return response.status(400).json({ message: 'no permission' })
    }
  }
}

export default UserController
