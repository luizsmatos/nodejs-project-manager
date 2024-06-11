import { InMemoryProjectsRepository } from '#/repositories/in-memory-projects-repository'
import { makeUser } from '#/factories/make-user'

import { CreateProjectUseCase } from './create-project-usecase'
import { faker } from '@faker-js/faker'

let sut: CreateProjectUseCase
let inMemoryProjectsRepository: InMemoryProjectsRepository

describe('List User Projects UseCase', () => {
  beforeEach(() => {
    inMemoryProjectsRepository = new InMemoryProjectsRepository()
    sut = new CreateProjectUseCase(inMemoryProjectsRepository)
  })

  it('should be able create a new project', async () => {
    const user = makeUser()

    const result = await sut.execute({
      userId: user.id,
      name: faker.lorem.word(5),
      description: faker.lorem.paragraph(),
    })

    expect(result.project).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
    expect(inMemoryProjectsRepository.items).toHaveLength(1)
  })
})
