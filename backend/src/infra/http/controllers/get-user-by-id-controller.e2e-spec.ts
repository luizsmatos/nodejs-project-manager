import request from 'supertest'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'

describe('Get User By Id Controller (e2e)', () => {
  it('should return 200 on success', async () => {
    const { cookies, user } = await createAndAuthenticateUser(app)

    const response = await request(app)
      .get(`/api/users/${user?.id}`)
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
