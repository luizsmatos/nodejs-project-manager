import request from 'supertest'
import { app } from '../app'

describe('Authenticate User Controller (e2e)', () => {
  it('should return 200 on success', async () => {
    await request(app).post('/auth/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await request(app).post('/auth/login').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ accessToken: expect.any(String) })
  })

  it('should return 401 if email is not found', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'notfound@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(401)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Credentials are invalid',
      }),
    )
  })

  it('should return 401 if password is incorrect', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'johndoe@example.com',
      password: '1234567',
    })

    expect(response.statusCode).toEqual(401)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Credentials are invalid',
      }),
    )
  })
})
