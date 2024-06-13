import { faker } from '@faker-js/faker'

import { makeProject } from '#/factories/make-project'
import { InMemoryProjectsRepository } from '#/repositories/in-memory-projects-repository'
import { InMemoryTasksRepository } from '#/repositories/in-memory-tasks-repository'

import { TaskStatus } from '../entities/task'
import { CreateTaskUseCase } from './create-task-usecase'
import { ProjectNotFoundError } from './errors/project-not-found-error'

let sut: CreateTaskUseCase
let inMemoryProjectsRepository: InMemoryProjectsRepository
let inMemoryTasksRepository: InMemoryTasksRepository

describe('Create Task UseCase', () => {
  beforeEach(() => {
    inMemoryProjectsRepository = new InMemoryProjectsRepository()
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(
      inMemoryProjectsRepository,
      inMemoryTasksRepository,
    )
  })

  it('should be able create a new task', async () => {
    const project = makeProject()

    const result = await sut.execute({
      projectId: project.id,
      title: faker.lorem.word(5),
      description: faker.lorem.paragraph(),
      status: faker.helpers.enumValue(TaskStatus),
      userId: faker.string.uuid(),
    })

    expect(result.task).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
    expect(inMemoryTasksRepository.items).toHaveLength(1)
  })

  it('should not be able create a new task if project does not exist', async () => {
    await expect(
      sut.execute({
        projectId: faker.string.uuid(),
        title: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
        status: faker.helpers.enumValue(TaskStatus),
        userId: faker.string.uuid(),
      }),
    ).rejects.toEqual(new ProjectNotFoundError())
  })
})
