import request from 'supertest'
import { faker } from '@faker-js/faker'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'

describe('Get Project By Id Controller (e2e)', () => {
  it('should return 200 on success', async () => {
    const { cookies } = await createAndAuthenticateUser(app)

    const createProject = await request(app)
      .post('/projects')
      .set('Cookie', cookies)
      .send({
        name: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
      })

    const response = await request(app)
      .get(`/projects/${createProject.body.id}`)
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.project).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })
})
