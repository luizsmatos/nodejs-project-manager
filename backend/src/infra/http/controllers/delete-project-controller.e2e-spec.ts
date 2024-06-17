import request from 'supertest'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { ProjectFactory } from '#/factories/make-project'
import { app } from '../app'

describe('Delete Project Controller (e2e)', () => {
  it('should return 204 on success', async () => {
    const { cookies, user } = await createAndAuthenticateUser(app)
    const project = await ProjectFactory.makePrismaProject({ userId: user?.id })

    const response = await request(app)
      .delete(`/api/projects/${project.id}`)
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
