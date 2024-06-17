import request from 'supertest'
import { ProjectFactory } from '#/factories/make-project'
import { TaskFactory } from '#/factories/make-task'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'

describe('Delete Task Controller (e2e)', () => {
  it('should return 204 on success', async () => {
    const { cookies, user } = await createAndAuthenticateUser(app)

    const project = await ProjectFactory.makePrismaProject({ userId: user?.id })
    const task = await TaskFactory.makePrismaTask({ projectId: project.id })

    const response = await request(app)
      .delete(`/api/tasks/${task.id}`)
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
