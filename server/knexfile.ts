import { HOST, USER, PASSWORD, DATABASE } from './src/config/config'

export = {

  development: {
    client: 'pg',
    connection: {
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  }

}
