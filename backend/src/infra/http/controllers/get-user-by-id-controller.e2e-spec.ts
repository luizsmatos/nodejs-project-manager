import request from 'supertest'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'
import { prisma } from '@/infra/database/prisma/prisma'

describe('Get User By Id Controller (e2e)', () => {
  it('should return 200 on success', async () => {
    const { cookies } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirst()

    const response = await request(app)
      .get(`/users/${user?.id}`)
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
