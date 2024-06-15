import { makeProject } from '#/factories/make-project'
import { InMemoryProjectsRepository } from '#/repositories/in-memory-projects-repository'

import { ProjectNotFoundError } from './errors/project-not-found-error'
import { GetProjectByIdUseCase } from './get-project-by-id-usecase'

let sut: GetProjectByIdUseCase
let inMemoryProjectsRepository: InMemoryProjectsRepository

describe('Get Project By Id UseCase', () => {
  beforeEach(() => {
    inMemoryProjectsRepository = new InMemoryProjectsRepository()
    sut = new GetProjectByIdUseCase(inMemoryProjectsRepository)
  })

  it('should be able to get the project', async () => {
    const project = makeProject()

    await inMemoryProjectsRepository.create(project)

    const result = await sut.execute({
      projectId: project.id,
    })

    expect(result).toEqual({
      project: expect.objectContaining({
        id: expect.any(String),
      }),
    })
    expect(inMemoryProjectsRepository.items).toHaveLength(1)
  })

  it('should not be possible to get the project if it does not exist', async () => {
    await expect(
      sut.execute({
        projectId: 'non-existing-project-id',
      }),
    ).rejects.toEqual(new ProjectNotFoundError())
  })
})
