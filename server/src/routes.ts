import express from 'express'
import { celebrate, Joi } from 'celebrate'

import MemberController from '@controllers/MemberController'

const routes = express.Router()

const memberController = new MemberController()

routes.get('/members', memberController.index)
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
