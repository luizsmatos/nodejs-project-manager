import request from 'supertest'
import { faker } from '@faker-js/faker'
import { ProjectFactory } from '#/factories/make-project'
import { TaskFactory } from '#/factories/make-task'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { prisma } from '@/infra/database/prisma/prisma'
import { app } from '../app'

describe('Edit Task Controller (e2e)', () => {
  it('should return 201 on success', async () => {
    const { cookies } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirst()
    const project = await ProjectFactory.makePrismaProject({ userId: user?.id })
    const task = await TaskFactory.makePrismaTask({ projectId: project.id })

    const updateTitle = faker.lorem.word(5)
    const response = await request(app)
      .put(`/api/tasks/${task.id}`)
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
