
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT

const PG_URL = process.env.PG_URL

export {
  PORT,
  PG_URL
}
