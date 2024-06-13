import request from 'supertest'
import { faker } from '@faker-js/faker'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'

describe('Delete Task Controller (e2e)', () => {
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

    const createTask = await request(app)
      .post(`/projects/${projectId}/tasks`)
      .set('Cookie', cookies)
      .send({
        title: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
      })

    const taskId = createTask.body.task.id

    const response = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
