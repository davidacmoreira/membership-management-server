module.exports = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'adc'
  },
  migrations: {
    directory: '../database/migrations'
  },
  seeds: {
    directory: '../database/seeds'
  },
  useNullAsDefault: true
}
