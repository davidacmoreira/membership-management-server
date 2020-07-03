import express from 'express'
import { celebrate, Joi } from 'celebrate'

import UserController from '@controllers/UserController'
import MemberController from '@controllers/MemberController'
import FeeController from '@controllers/FeeController'
import PaymentController from '@controllers/PaymentController'

const routes = express.Router()

const userController = new UserController()
const memberController = new MemberController()
const feeController = new FeeController()
const paymentController = new PaymentController()

routes.get('/users',
  celebrate({
    headers: Joi.object({
      authorization: Joi.number().required()
    }).unknown(),
    query: Joi.object().keys({
      username: Joi.string()
    })
  }, { abortEarly: false }),
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
  }, { abortEarly: false }),
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
  }, { abortEarly: false }),
  userController.create
)

routes.post('/users/signin',
  celebrate({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }, { abortEarly: false }),
  userController.signin
)

routes.get('/members',
  celebrate({
    query: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string()
    })
  }, { abortEarly: false }),
  memberController.index
)

routes.get('/members/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.number()
    })
  }, { abortEarly: false }),
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
  }, { abortEarly: false }),
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
  }, { abortEarly: false }),
  memberController.update
)

routes.get('/fees',
  celebrate({
    query: Joi.object().keys({
      date: Joi.date()
    })
  }, { abortEarly: false }),
  feeController.index
)

routes.get('/fees/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.number()
    })
  }, { abortEarly: false }),
  feeController.show
)

routes.post('/fees',
  celebrate({
    body: Joi.object().keys({
      date: Joi.date().required(),
      value: Joi.number().required()
    })
  }, { abortEarly: false }),
  feeController.create
)

routes.put('/fees/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.number()
    }),
    body: Joi.object().keys({
      date: Joi.date(),
      value: Joi.number()
    })
  }, { abortEarly: false }),
  feeController.update
)

routes.get('/payments',
  celebrate({
    query: Joi.object().keys({
      date: Joi.date(),
      member_id: Joi.number()
    })
  }, { abortEarly: false }),
  paymentController.index
)

routes.get('/payments/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.number()
    })
  }, { abortEarly: false }),
  paymentController.show
)

routes.post('/payments',
  celebrate({
    body: Joi.object().keys({
      date: Joi.date().required(),
      member_id: Joi.number().required(),
      fee_id: Joi.number().required()
    })
  }, { abortEarly: false }),
  paymentController.create
)

routes.put('/payments/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.number()
    }),
    body: Joi.object().keys({
      date: Joi.date(),
      fee_id: Joi.number()
    })
  }, { abortEarly: false }),
  paymentController.update
)

export default routes
