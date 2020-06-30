import request from 'supertest'
import app from '../../app'
import connection from '@database/connection'

describe('Members', () => {
  /* beforeEach(() => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  }) */

  afterAll(() => {
    connection.destroy()
  })

  it('should create a new member', async () => {
    const response = await request(app)
      .post('/members')
      .set('Authorization', 2)
      .send({
        name: 'Joe',
        address: 'Paris',
        phone: 1234567890,
        email: 'joe@mail.test',
        description: 'Special One',
        state: 'active'
      })

    expect(response.body).toHaveProperty('id')
  })

  it('should update a member', async () => {
    const response = await request(app)
      .put('/members/1')
      .set('Authorization', 2)
      .send({
        description: 'Special Two',
        state: 'inactive'
      })

    expect(response.body).toHaveProperty('id')
  })
})
