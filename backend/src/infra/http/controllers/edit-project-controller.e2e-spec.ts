import request from 'supertest'
import { faker } from '@faker-js/faker'
import { ProjectFactory } from '#/factories/make-project'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'

describe('Edit Project Controller (e2e)', () => {
  it('should return 200 on success', async () => {
    const { cookies, user } = await createAndAuthenticateUser(app)
    const project = await ProjectFactory.makePrismaProject({ userId: user?.id })

    const updateName = faker.lorem.word(5)
    const updateDescription = faker.lorem.paragraph()

    const response = await request(app)
      .put(`/api/projects/${project.id}`)
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
