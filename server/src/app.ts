import express from 'express'
import { errors } from 'celebrate'

import routes from './routes'
import routesNoAuth from './routesNoAuth'

const app = express()

app.use(express.json())
app.use(routesNoAuth)
app.use(routes)

app.use(errors())

export default app
