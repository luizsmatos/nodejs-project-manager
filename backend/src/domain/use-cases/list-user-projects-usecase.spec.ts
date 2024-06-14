import { InMemoryProjectsRepository } from '#/repositories/in-memory-projects-repository'
import { makeProject } from '#/factories/make-project'
import { makeUser } from '#/factories/make-user'

import { ListUserProjectsUseCase } from './list-user-projects-usecase'

let sut: ListUserProjectsUseCase
let inMemoryProjectsRepository: InMemoryProjectsRepository

describe('List User Projects UseCase', () => {
  beforeEach(() => {
    inMemoryProjectsRepository = new InMemoryProjectsRepository()
    sut = new ListUserProjectsUseCase(inMemoryProjectsRepository)
  })

  it('should be able to list a user projects', async () => {
    const user01 = makeUser()
    const user02 = makeUser()

    inMemoryProjectsRepository.items.push(makeProject({ userId: user01.id }))
    inMemoryProjectsRepository.items.push(makeProject({ userId: user01.id }))
    inMemoryProjectsRepository.items.push(makeProject({ userId: user02.id }))

    const result = await sut.execute({
      userId: user01.id,
      page: 1,
    })

    expect(result.projects).toHaveLength(2)
    expect(inMemoryProjectsRepository.items).toHaveLength(3)
  })

  it('should be able to list paginated projects', async () => {
    const user = makeUser()

    for (let i = 1; i <= 12; i++) {
      inMemoryProjectsRepository.items.push(makeProject({ userId: user.id }))
    }

    const result = await sut.execute({
      userId: user.id,
      page: 2,
    })

    expect(result.projects).toHaveLength(2)
    expect(result.meta.totalCount).toBe(12)
  })
})
