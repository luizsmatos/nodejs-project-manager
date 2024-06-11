import { faker } from '@faker-js/faker'

import { makeProject } from '#/factories/make-project'
import { InMemoryTasksRepository } from '#/repositories/in-memory-tasks-repository'

import { CreateTaskUseCase } from './create-task-usecase'

let sut: CreateTaskUseCase
let inMemoryTasksRepository: InMemoryTasksRepository

describe('Create Task UseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(inMemoryTasksRepository)
  })

  it('should be able create a new task', async () => {
    const project = makeProject()

    const result = await sut.execute({
      projectId: project.id,
      title: faker.lorem.word(5),
      description: faker.lorem.paragraph(),
    })

    expect(result.task).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
    expect(inMemoryTasksRepository.items).toHaveLength(1)
  })
})
