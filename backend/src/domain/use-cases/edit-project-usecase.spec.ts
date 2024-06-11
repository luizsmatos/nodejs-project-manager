import { faker } from '@faker-js/faker'

import { InMemoryProjectsRepository } from '#/repositories/in-memory-projects-repository'
import { makeUser } from '#/factories/make-user'
import { makeProject } from '#/factories/make-project'

import { EditProjectUseCase } from './edit-project-usecase'
import { ProjectNotFoundError } from './errors/project-not-found-error'
import { UserNotAuthorizedError } from './errors/user-not-authorized-error'

let sut: EditProjectUseCase
let inMemoryProjectsRepository: InMemoryProjectsRepository

describe('Edit Project UseCase', () => {
  beforeEach(() => {
    inMemoryProjectsRepository = new InMemoryProjectsRepository()
    sut = new EditProjectUseCase(inMemoryProjectsRepository)
  })

  it('should be able to edit an project', async () => {
    const user = makeUser()
    const project = makeProject({ userId: user.id })

    await inMemoryProjectsRepository.create(project)

    const updateName = faker.lorem.word(5)
    const updateDescription = faker.lorem.paragraph()

    const result = await sut.execute({
      projectId: project.id,
      userId: user.id,
      name: updateName,
      description: updateDescription,
    })

    expect(result.project).toEqual(
      expect.objectContaining({
        id: project.id,
        userId: user.id,
        name: updateName,
        description: updateDescription,
        updatedAt: expect.any(Date),
      }),
    )
    expect(inMemoryProjectsRepository.items).toHaveLength(1)
  })

  it("should not be able to edit an project if it doesn't exist", async () => {
    await expect(
      sut.execute({
        projectId: 'not-found',
        userId: 'user-id',
        name: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
      }),
    ).rejects.toEqual(new ProjectNotFoundError())
  })

  it("should not be able to edit an project if it doesn't belong to the user", async () => {
    const project = makeProject()

    await inMemoryProjectsRepository.create(project)

    await expect(
      sut.execute({
        projectId: project.id,
        userId: 'user-not-authorized',
        name: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
      }),
    ).rejects.toEqual(new UserNotAuthorizedError())
  })
})
