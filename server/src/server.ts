import express from 'express'
import { PORT_SERVER } from '@config/config.json'

const app = express()

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

app.listen(PORT_SERVER)
