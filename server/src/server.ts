import express from 'express'
import { errors } from 'celebrate'

import routes from './routes'
import { PORT_SERVER } from '@config/config.json'

const app = express()

app.use(express.json())
app.use(routes)

app.use(errors())

app.listen(PORT_SERVER)
