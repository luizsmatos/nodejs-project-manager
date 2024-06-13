import request from 'supertest'
import { faker } from '@faker-js/faker'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'

describe('Edit Project Controller (e2e)', () => {
  it('should return 200 on success', async () => {
    const { cookies } = await createAndAuthenticateUser(app)

    const createProject = await request(app)
      .post('/projects')
      .set('Cookie', cookies)
      .send({
        name: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
      })

    const projectId = createProject.body.project.id

    const updateName = faker.lorem.word(5)
    const updateDescription = faker.lorem.paragraph()

    const response = await request(app)
      .put(`/projects/${projectId}`)
      .set('Cookie', cookies)
      .send({
        name: updateName,
        description: updateDescription,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.project).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: updateName,
        description: updateDescription,
      }),
    )
  })
})
