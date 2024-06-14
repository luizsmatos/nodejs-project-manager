import request from 'supertest'
import { faker } from '@faker-js/faker'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { TaskStatus } from '@/domain/entities/task'
import { app } from '../app'

describe('Create Task Controller (e2e)', () => {
  it('should return 201 on success', async () => {
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
      .post(`/projects/${projectId}/tasks`)
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
