// eslint-disable-next-line
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { SECRET } from '../config/config'
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

const createToken = (userId: number) => {
  const token = jwt.sign({ id: userId }, SECRET, { expiresIn: 86400 })

  return token
}

const checkPassword = async (password: string, hash: string) => {
  const compare = await bcrypt.compare(password, hash)

  return compare
}

class UserController {
  async index (request: Request, response: Response) {
    const userId = Number(request.headers.user_id)
    console.log('users - create: ' + userId)

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
    console.log('users - create: ' + userId)

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
    console.log('users - create: ' + userId)

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

  async signin (request: Request, response: Response) {
    const user = await knex('users')
      .where('username', request.body.username)
      .select('*')
      .first()

    if (user) {
      const validPassword = await checkPassword(request.body.password, user.password)

      delete request.body.password
      delete user.password

      if (validPassword) {
        const token = createToken(Number(user.id))

        await knex('users')
          .update({ token })
          .where('id', Number(user.id))

        return response.status(200).json({ token })
      }

      return response.status(400).json({ message: 'invalid password' })
    }

    return response.status(400).json({ message: 'invalid username' })
  }
}

export default UserController
