import { InMemoryTasksRepository } from '#/repositories/in-memory-tasks-repository'
import { makeProject } from '#/factories/make-project'
import { makeTask } from '#/factories/make-task'

import { ListProjectTasksUseCase } from './list-project-tasks-usecase'

let sut: ListProjectTasksUseCase
let inMemoryTasksRepository: InMemoryTasksRepository

describe('List Project Tasks UseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new ListProjectTasksUseCase(inMemoryTasksRepository)
  })

  it('should be able to list a project tasks', async () => {
    const project01 = makeProject()
    const project02 = makeProject()

    inMemoryTasksRepository.items.push(makeTask({ projectId: project01.id }))
    inMemoryTasksRepository.items.push(makeTask({ projectId: project01.id }))
    inMemoryTasksRepository.items.push(makeTask({ projectId: project02.id }))

    const result = await sut.execute({
      projectId: project01.id,
      page: 1,
    })

    expect(result.tasks).toHaveLength(2)
    expect(inMemoryTasksRepository.items).toHaveLength(3)
  })

  it('should be able to list paginated tasks', async () => {
    const project = makeProject()

    for (let i = 1; i <= 12; i++) {
      inMemoryTasksRepository.items.push(makeTask({ projectId: project.id }))
    }

    const result = await sut.execute({
      projectId: project.id,
      page: 2,
    })

    expect(result.tasks).toHaveLength(2)
    expect(result.meta.totalCount).toBe(12)
  })
})
