import express from 'express'
import { celebrate, Joi } from 'celebrate'

import middlewareAuth from './middleware/auth'

import UserController from '@controllers/UserController'
import MemberController from '@controllers/MemberController'
import FeeController from '@controllers/FeeController'
import PaymentController from '@controllers/PaymentController'

const routes = express.Router()

routes.use(middlewareAuth)

const userController = new UserController()
const memberController = new MemberController()
const feeController = new FeeController()
const paymentController = new PaymentController()

routes.get('/users',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
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
      authorization: Joi.string().required()
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
      authorization: Joi.string().required()
    }).unknown(),
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }, { abortEarly: false }),
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
  paymentController.update
)

export default routes
