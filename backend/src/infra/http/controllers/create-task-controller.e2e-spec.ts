import request from 'supertest'
import { faker } from '@faker-js/faker'
import { ProjectFactory } from '#/factories/make-project'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { TaskStatus } from '@/domain/entities/task'
import { app } from '../app'

describe('Create Task Controller (e2e)', () => {
  it('should return 201 on success', async () => {
    const { cookies, user } = await createAndAuthenticateUser(app)
    const project = await ProjectFactory.makePrismaProject({ userId: user?.id })

    const response = await request(app)
      .post(`/api/projects/${project.id}/tasks`)
      .set('Cookie', cookies)
      .send({
        title: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
        status: faker.helpers.enumValue(TaskStatus),
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.task).toEqual(
      expect.objectContaining({ id: expect.any(String) }),
    )
  })
})
