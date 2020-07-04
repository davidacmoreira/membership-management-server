import express from 'express'
import { celebrate, Joi } from 'celebrate'

import UserController from '@controllers/UserController'

const routesAuth = express.Router()

const userController = new UserController()

routesAuth.post('/users/signin',
  celebrate({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }, { abortEarly: false }),
  userController.signin
)

export default routesAuth
