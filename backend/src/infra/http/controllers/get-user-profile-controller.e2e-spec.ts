import request from 'supertest'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'

describe('Get User Profile Controller (e2e)', () => {
  it('should return 200 on success', async () => {
    const { cookies } = await createAndAuthenticateUser(app)

    const response = await request(app)
      .get('/users/me')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })
})
