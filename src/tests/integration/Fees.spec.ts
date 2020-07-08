import request from 'supertest'
import app from '../../app'
import connection from '@database/connection'

let token: String

describe('Fees', () => {
  beforeEach(async () => {
    const responseSignin = await request(app)
      .post('/signin')
      .send({
        username: 'admin',
        password: 'admin'
      })

    token = 'Bearer ' + responseSignin.body.token
  })

  afterAll(() => {
    connection.destroy()
  })

  it('should create a new fee', async () => {
    const response = await request(app)
      .post('/fees')
      .set('Authorization', token)
      .send({
        date: '2020-06-01',
        value: 5
      })

    expect(response.statusCode).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty('id')
  })

  it('should update a fee', async () => {
    const response = await request(app)
      .put('/fees/1')
      .set('Authorization', token)
      .send({
        date: '2020-01-01',
        value: 10
      })

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty('id')
  })

  it('should list all fees', async () => {
    const response = await request(app)
      .get('/fees')
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ date: '2020-01-01' }),
        expect.objectContaining({ value: 10 }),
        expect.objectContaining({ user_id: 1 })
      ])
    )
  })

  it('should list fees with date match', async () => {
    const response = await request(app)
      .get('/fees')
      .query({ date: '2020-01-01' })
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ date: '2020-01-01' }),
        expect.objectContaining({ value: 10 }),
        expect.objectContaining({ user_id: 1 })
      ])
    )
  })

  it('should list fees with specific id', async () => {
    const response = await request(app)
      .get('/fees/1')
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(expect.objectContaining({ id: 1 }))
    expect(response.body).toEqual(expect.objectContaining({ date: '2020-01-01' }))
    expect(response.body).toEqual(expect.objectContaining({ value: 10 }))
    expect(response.body).toEqual(expect.objectContaining({ user_id: 1 }))
  })
})
