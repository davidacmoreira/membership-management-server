import request from 'supertest'
import app from '../../app'
import connection from '@database/connection'

let token: String

describe('Payments', () => {
  beforeEach(async () => {
    const responseSignin = await request(app)
      .post('/signin')
      .send({
        username: 'user',
        password: 'password'
      })

    token = 'Bearer ' + responseSignin.body.token
  })

  afterAll(() => {
    connection.destroy()
  })

  it('should create a new payment', async () => {
    const response = await request(app)
      .post('/payments')
      .set('Authorization', token)
      .send({
        date: '2020-06-01',
        member_id: 1,
        fee_id: 1
      })

    expect(response.statusCode).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty('id')
  })

  it('should list all payments', async () => {
    const response = await request(app)
      .get('/payments')
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ date: '2020-06-01' }),
        expect.objectContaining({ fee_id: 1 }),
        expect.objectContaining({ user_id: 2 })
      ])
    )
  })

  it('should list payments with date match', async () => {
    const response = await request(app)
      .get('/payments')
      .query({ date: '2020-06-01' })
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ date: '2020-06-01' }),
        expect.objectContaining({ fee_id: 1 }),
        expect.objectContaining({ user_id: 2 })
      ])
    )
  })

  it('should list payments with specific id', async () => {
    const response = await request(app)
      .get('/payments/1')
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(expect.objectContaining({ id: 1 }))
    expect(response.body).toEqual(expect.objectContaining({ date: '2020-06-01' }))
    expect(response.body).toEqual(expect.objectContaining({ fee_id: 1 }))
    expect(response.body).toEqual(expect.objectContaining({ user_id: 2 }))
  })
})
