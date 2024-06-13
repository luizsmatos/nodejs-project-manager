import { faker } from '@faker-js/faker'

import { makeProject } from '#/factories/make-project'
import { makeUser } from '#/factories/make-user'
import { makeTask } from '#/factories/make-task'
import { InMemoryTasksRepository } from '#/repositories/in-memory-tasks-repository'

import { TaskStatus } from '../entities/task'
import { EditTaskUseCase } from './edit-task-usecase'
import { TaskNotFoundError } from './errors/task-not-found-error'

let sut: EditTaskUseCase
let inMemoryTasksRepository: InMemoryTasksRepository

describe('Edit Task UseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new EditTaskUseCase(inMemoryTasksRepository)
  })

  it('should be able to edit an task', async () => {
    const user = makeUser()
    const project = makeProject({ userId: user.id })
    const task = makeTask({ projectId: project.id })

    await inMemoryTasksRepository.create(task)

    const updateTitle = faker.lorem.word(5)
    const updateDescription = faker.lorem.paragraph()

    const result = await sut.execute({
      taskId: task.id,
      title: updateTitle,
      description: updateDescription,
      status: TaskStatus.DONE,
      completedBy: user.id,
    })

    expect(result.task).toEqual(
      expect.objectContaining({
        id: task.id,
        projectId: project.id,
        title: updateTitle,
        description: updateDescription,
        completedBy: user.id,
        completedAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    )
    expect(inMemoryTasksRepository.items).toHaveLength(1)
  })

  it("should not be able to edit an task if it doesn't exist", async () => {
    await expect(
      sut.execute({
        taskId: 'not-found',
        title: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
        status: TaskStatus.PENDING,
      }),
    ).rejects.toEqual(new TaskNotFoundError())
  })
})
