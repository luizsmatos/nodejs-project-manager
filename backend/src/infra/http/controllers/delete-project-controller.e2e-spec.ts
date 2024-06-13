import request from 'supertest'
import { faker } from '@faker-js/faker'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'

describe('Delete Project Controller (e2e)', () => {
  it('should return 204 on success', async () => {
    const { cookies } = await createAndAuthenticateUser(app)

    const createProject = await request(app)
      .post('/projects')
      .set('Cookie', cookies)
      .send({
        name: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
      })

    const projectId = createProject.body.project.id

    const response = await request(app)
      .delete(`/projects/${projectId}`)
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
