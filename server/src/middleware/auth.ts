// eslint-disable-next-line
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config/config'

interface Decoded {
  id: String
  iat: String
  exp: String
}

export default (request: Request, response: Response, next: NextFunction) => {
  const tokenAuth = request.headers.authorization

  if (!tokenAuth) {
    return response.status(401).json({ message: 'no token provided' })
  }

  const splitAuth = tokenAuth.split(' ')

  if (splitAuth.length !== 2) {
    return response.status(401).json({ message: 'invalid token format' })
  }

  const [scheme, token] = splitAuth

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ message: 'invalid token format' })
  }

  jwt.verify(token, SECRET, (error, decoded: Decoded) => {
    if (error) {
      return response.status(401).json({ message: 'invalid token' })
    }

    request.headers.user_id = String(decoded.id)

    return next()
  })
}
