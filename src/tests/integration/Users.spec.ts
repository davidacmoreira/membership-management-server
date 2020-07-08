import request from 'supertest'
import app from '../../app'
import connection from '@database/connection'

let token: String

describe('Users', () => {
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

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .set('Authorization', token)
      .send({
        username: 'tom',
        password: 'mot321'
      })

    expect(response.statusCode).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty('id')
  })

  it('should list all users', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ username: 'admin' }),
        expect.objectContaining({ id: 2 }),
        expect.objectContaining({ username: 'user' }),
        expect.objectContaining({ id: 3 }),
        expect.objectContaining({ username: 'tom' })
      ])
    )
  })

  it('should list users with username match', async () => {
    const response = await request(app)
      .get('/users')
      .query({ username: 'tom' })
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 3 }),
        expect.objectContaining({ username: 'tom' })
      ])
    )
  })

  it('should list user with specific id', async () => {
    const response = await request(app)
      .get('/users/3')
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(expect.objectContaining({ id: 3 }))
    expect(response.body).toEqual(expect.objectContaining({ username: 'tom' }))
  })
})
