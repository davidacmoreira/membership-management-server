import express from 'express'

import MemberController from '@controllers/MemberController'

const routes = express.Router()

const memberController = new MemberController()

routes.get('/members', memberController.index)
routes.get('/members/:id', memberController.show)
routes.post('/members', memberController.create)

export default routes
