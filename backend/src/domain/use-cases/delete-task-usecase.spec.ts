import { InMemoryTasksRepository } from '#/repositories/in-memory-tasks-repository'
import { makeProject } from '#/factories/make-project'
import { makeTask } from '#/factories/make-task'

import { DeleteTaskUseCase } from './delete-task-usecase'
import { TaskNotFoundError } from './errors/task-not-found-error'

let sut: DeleteTaskUseCase
let inMemoryTasksRepository: InMemoryTasksRepository

describe('Delete Task UseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new DeleteTaskUseCase(inMemoryTasksRepository)
  })

  it('should be able to delete an task', async () => {
    const project = makeProject()
    const task = makeTask({ projectId: project.id })

    await inMemoryTasksRepository.create(task)

    await sut.execute({ taskId: task.id })

    expect(inMemoryTasksRepository.items).toHaveLength(0)
  })

  it("should not be able to delete an task if it doesn't exist", async () => {
    await expect(
      sut.execute({
        taskId: 'not-found',
      }),
    ).rejects.toEqual(new TaskNotFoundError())
  })
})
