import express from 'express'
import { celebrate, Joi } from 'celebrate'

import middlewareAuth from './middleware/auth'
import middlewareRole from './middleware/role'

import AuthController from '@controllers/AuthController'
import UserController from '@controllers/UserController'
import MemberController from '@controllers/MemberController'
import FeeController from '@controllers/FeeController'
import PaymentController from '@controllers/PaymentController'

const routes = express.Router()

const authController = new AuthController()
const userController = new UserController()
const memberController = new MemberController()
const feeController = new FeeController()
const paymentController = new PaymentController()

routes.post('/users/signin',
  celebrate({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }, { abortEarly: false }),
  authController.signin
)

routes.get('/users',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    query: Joi.object().keys({
      username: Joi.string()
    })
  }, { abortEarly: false }),
  [middlewareAuth, middlewareRole],
  userController.index
)

routes.get('/users/:id',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    params: Joi.object().keys({
      id: Joi.number()
    })
  }, { abortEarly: false }),
  [middlewareAuth, middlewareRole],
  userController.show
)

routes.post('/users',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }, { abortEarly: false }),
  [middlewareAuth, middlewareRole],
  userController.create
)

routes.get('/members',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    query: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string()
    })
  }, { abortEarly: false }),
  [middlewareAuth],
  memberController.index
)

routes.get('/members/:id',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    params: Joi.object().keys({
      id: Joi.number()
    })
  }, { abortEarly: false }),
  [middlewareAuth],
  memberController.show
)

routes.post('/members',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
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
  [middlewareAuth],
  memberController.create
)

routes.put('/members/:id',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
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
  [middlewareAuth],
  memberController.update
)

routes.get('/fees',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    query: Joi.object().keys({
      date: Joi.date()
    })
  }, { abortEarly: false }),
  feeController.index
)

routes.get('/fees/:id',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    params: Joi.object().keys({
      id: Joi.number()
    })
  }, { abortEarly: false }),
  [middlewareAuth],
  feeController.show
)

routes.post('/fees',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    body: Joi.object().keys({
      date: Joi.date().required(),
      value: Joi.number().required()
    })
  }, { abortEarly: false }),
  [middlewareAuth, middlewareRole],
  feeController.create
)

routes.put('/fees/:id',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    params: Joi.object().keys({
      id: Joi.number()
    }),
    body: Joi.object().keys({
      date: Joi.date(),
      value: Joi.number()
    })
  }, { abortEarly: false }),
  [middlewareAuth, middlewareRole],
  feeController.update
)

routes.get('/payments',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    query: Joi.object().keys({
      date: Joi.date(),
      member_id: Joi.number()
    })
  }, { abortEarly: false }),
  [middlewareAuth],
  paymentController.index
)

routes.get('/payments/:id',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    params: Joi.object().keys({
      id: Joi.number()
    })
  }, { abortEarly: false }),
  [middlewareAuth],
  paymentController.show
)

routes.post('/payments',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    body: Joi.object().keys({
      date: Joi.date().required(),
      member_id: Joi.number().required(),
      fee_id: Joi.number().required()
    })
  }, { abortEarly: false }),
  [middlewareAuth],
  paymentController.create
)

routes.put('/payments/:id',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    params: Joi.object().keys({
      id: Joi.number()
    }),
    body: Joi.object().keys({
      date: Joi.date(),
      fee_id: Joi.number()
    })
  }, { abortEarly: false }),
  [middlewareAuth],
  paymentController.update
)

export default routes
