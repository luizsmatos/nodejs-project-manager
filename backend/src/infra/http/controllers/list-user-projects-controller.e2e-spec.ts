import request from 'supertest'
import { ProjectFactory } from '#/factories/make-project'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'

describe('List User Projects Controller (e2e)', () => {
  it('should return 200 on success', async () => {
    const { cookies, user } = await createAndAuthenticateUser(app)

    await ProjectFactory.makePrismaProject({
      userId: user?.id,
    })

    await ProjectFactory.makePrismaProject({
      userId: user?.id,
    })

    const response = await request(app)
      .get('/api/projects')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.projects).toHaveLength(2)
  })
})
