import { InMemoryProjectsRepository } from '#/repositories/in-memory-projects-repository'
import { makeUser } from '#/factories/make-user'
import { makeProject } from '#/factories/make-project'

import { DeleteProjectUseCase } from './delete-project-usecase'
import { ProjectNotFoundError } from './errors/project-not-found-error'
import { UserNotAuthorizedError } from './errors/user-not-authorized-error'

let sut: DeleteProjectUseCase
let inMemoryProjectsRepository: InMemoryProjectsRepository

describe('Delete Project UseCase', () => {
  beforeEach(() => {
    inMemoryProjectsRepository = new InMemoryProjectsRepository()
    sut = new DeleteProjectUseCase(inMemoryProjectsRepository)
  })

  it('should be able to delete an project', async () => {
    const user = makeUser()
    const project = makeProject({ userId: user.id })

    await inMemoryProjectsRepository.create(project)

    await sut.execute({ projectId: project.id, userId: user.id })

    expect(inMemoryProjectsRepository.items).toHaveLength(0)
  })

  it("should not be able to delete an project if it doesn't exist", async () => {
    await expect(
      sut.execute({
        projectId: 'not-found',
        userId: 'user-id',
      }),
    ).rejects.toEqual(new ProjectNotFoundError())
  })

  it("should not be able to delete an delete if it doesn't belong to the user", async () => {
    const project = makeProject()

    await inMemoryProjectsRepository.create(project)

    await expect(
      sut.execute({
        projectId: project.id,
        userId: 'user-not-authorized',
      }),
    ).rejects.toEqual(new UserNotAuthorizedError())
  })
})
