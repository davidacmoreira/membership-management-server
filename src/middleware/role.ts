// eslint-disable-next-line
import { Request, Response, NextFunction } from 'express'

export default (request: Request, response: Response, next: NextFunction) => {
  const userId = Number(request.headers.user_id)

  if (userId !== 1) {
    return response.status(400).json({ message: 'no permission' })
  }

  return next()
}
