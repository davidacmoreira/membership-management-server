module.exports = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'adc'
  },
  migrations: {
    directory: './src/database/migrations'
  },
  useNullAsDefault: true
}
