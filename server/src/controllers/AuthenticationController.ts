// eslint-disable-next-line
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import knex from '@database/connection'

const createToken = () => {
  const token = crypto.randomBytes(16).toString('base64')

  return token
}

const checkPassword = async (password: string, hash: string) => {
  const compare = await bcrypt.compare(password, hash)

  return compare
}

class AuthenticationController {
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
        const token = createToken()

        await knex('users')
          .update({ token })
          .where('id', user.id)

        return response.status(200).json({ token })
      }

      return response.status(400).json({ message: 'invalid password' })
    }

    return response.status(400).json({ message: 'invalid username' })
  }
}

export default AuthenticationController
