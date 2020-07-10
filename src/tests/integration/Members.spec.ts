import request from 'supertest'
import app from '../../app'
import connection from '@database/connection'

let token: String

describe('Members', () => {
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

  it('should create a new member', async () => {
    const response = await request(app)
      .post('/members')
      .set('Authorization', token)
      .send({
        name: 'Joe',
        address: 'Paris',
        phone: 1234567890,
        email: 'joe@mail.com',
        description: 'Special One',
        state: 'inactive'
      })

    expect(response.statusCode).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty('id')
  })

  it('should update a member', async () => {
    const response = await request(app)
      .put('/members/1')
      .set('Authorization', token)
      .send({
        description: 'Special Two',
        state: 'active'
      })

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty('id')
  })

  it('should list all members', async () => {
    const response = await request(app)
      .get('/members')
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ name: 'Joe' }),
        expect.objectContaining({ address: 'Paris' }),
        expect.objectContaining({ phone: 1234567890 }),
        expect.objectContaining({ email: 'joe@mail.com' }),
        expect.objectContaining({ description: 'Special Two' }),
        expect.objectContaining({ state: 'active' }),
        expect.objectContaining({ user_id: 2 })
      ])
    )
  })

  it('should list members with name match', async () => {
    const response = await request(app)
      .get('/members')
      .query({ name: 'Joe' })
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ name: 'Joe' }),
        expect.objectContaining({ address: 'Paris' }),
        expect.objectContaining({ phone: 1234567890 }),
        expect.objectContaining({ email: 'joe@mail.com' }),
        expect.objectContaining({ description: 'Special Two' }),
        expect.objectContaining({ state: 'active' }),
        expect.objectContaining({ user_id: 2 })
      ])
    )
  })

  it('should list active members without a specific fee', async () => {
    const response = await request(app)
      .get('/members')
      .query({
        state: 'active',
        fee: '2021-01-01'
      })
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ name: 'Joe' }),
        expect.objectContaining({ address: 'Paris' }),
        expect.objectContaining({ phone: 1234567890 }),
        expect.objectContaining({ email: 'joe@mail.com' }),
        expect.objectContaining({ description: 'Special Two' }),
        expect.objectContaining({ state: 'active' }),
        expect.objectContaining({ user_id: 2 })
      ])
    )
  })

  it('should list member with specific id', async () => {
    const response = await request(app)
      .get('/members/1')
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual(expect.objectContaining({ id: 1 }))
    expect(response.body).toEqual(expect.objectContaining({ name: 'Joe' }))
    expect(response.body).toEqual(expect.objectContaining({ address: 'Paris' }))
    expect(response.body).toEqual(expect.objectContaining({ phone: 1234567890 }))
    expect(response.body).toEqual(expect.objectContaining({ email: 'joe@mail.com' }))
    expect(response.body).toEqual(expect.objectContaining({ description: 'Special Two' }))
    expect(response.body).toEqual(expect.objectContaining({ state: 'active' }))
    expect(response.body).toEqual(expect.objectContaining({ user_id: 2 }))
  })
})
