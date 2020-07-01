import request from 'supertest'
import app from '../../app'
import connection from '@database/connection'

describe('Users', () => {
  /* beforeEach(() => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  }) */

  afterAll(() => {
    connection.destroy()
  })

  it('should create a new member', async () => {
    const response = await request(app)
      .post('/users')
      .set('Authorization', 1)
      .send({
        username: 'joe',
        password: 'test123'
      })

    expect(response.body).toHaveProperty('id')
  })
})
