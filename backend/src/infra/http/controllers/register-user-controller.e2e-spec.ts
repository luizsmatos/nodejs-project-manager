import request from 'supertest'
import { app } from '../app'

describe('Register User Controller (e2e)', () => {
  it('should return 201 on success', async () => {
    const response = await request(app).post('/auth/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should return 409 if email is already in use', async () => {
    const response = await request(app).post('/auth/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(409)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'User "johndoe@example.com" already exists',
      }),
    )
  })
})
