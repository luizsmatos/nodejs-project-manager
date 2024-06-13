import request from 'supertest'
import { faker } from '@faker-js/faker'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'

describe('Edit Task Controller (e2e)', () => {
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

    const createTask = await request(app)
      .post(`/projects/${projectId}/tasks`)
      .set('Cookie', cookies)
      .send({
        title: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
      })

    const taskId = createTask.body.task.id
    const updateTitle = faker.lorem.word(5)

    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Cookie', cookies)
      .send({
        title: updateTitle,
        description: faker.lorem.paragraph(),
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.task).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: updateTitle,
      }),
    )
  })
})
