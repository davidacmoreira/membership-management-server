import express from 'express'
import { celebrate, Joi } from 'celebrate'

import UserController from '@controllers/UserController'
import AuthenticationController from '@controllers/AuthenticationController'
import MemberController from '@controllers/MemberController'

const routes = express.Router()

const userController = new UserController()
const autheticationController = new AuthenticationController()
const memberController = new MemberController()

routes.get('/users',
  celebrate({
    headers: Joi.object({
      authorization: Joi.number().required()
    }).unknown(),
    query: Joi.object().keys({
      username: Joi.string()
    })
  }, {
    abortEarly: false
  }),
  userController.index
)

routes.get('/users/:id',
  celebrate({
    headers: Joi.object({
      authorization: Joi.number().required()
    }).unknown(),
    params: Joi.object().keys({
      id: Joi.number()
    })
  }, {
    abortEarly: false
  }),
  userController.show
)

routes.post('/users',
  celebrate({
    headers: Joi.object({
      authorization: Joi.number().required()
    }).unknown(),
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }, {
    abortEarly: false
  }),
  userController.create
)

routes.post('/users/signin',
  celebrate({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }, {
    abortEarly: false
  }),
  autheticationController.signin
)

routes.get('/members',
  celebrate({
    query: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string()
    })
  }, {
    abortEarly: false
  }),
  memberController.index
)

routes.get('/members/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.number()
    })
  }, {
    abortEarly: false
  }),
  memberController.show
)

routes.post('/members',
  celebrate({
    headers: Joi.object({
      authorization: Joi.number().required()
    }).unknown(),
    body: Joi.object().keys({
      name: Joi.string().required(),
      address: Joi.string(),
      phone: Joi.number(),
      email: Joi.string().email(),
      description: Joi.string(),
      state: Joi.string().required()
    })
  }, {
    abortEarly: false
  }),
  memberController.create
)

routes.put('/members/:id',
  celebrate({
    headers: Joi.object({
      authorization: Joi.number().required()
    }).unknown(),
    params: Joi.object().keys({
      id: Joi.number()
    }),
    body: Joi.object().keys({
      name: Joi.string(),
      address: Joi.string(),
      phone: Joi.number(),
      email: Joi.string().email(),
      description: Joi.string(),
      state: Joi.string()
    })
  }, {
    abortEarly: false
  }),
  memberController.update
)

export default routes
