import { makeUser } from '#/factories/make-user'
import { InMemoryUsersRepository } from '#/repositories/in-memory-users-repository'

import { UserNotFoundError } from './errors/user-not-found-error'
import { GetUserByIdUseCase } from './get-user-by-id-usecase'

let sut: GetUserByIdUseCase
let inMemoryUsersRepository: InMemoryUsersRepository

describe('Get User By Id UseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserByIdUseCase(inMemoryUsersRepository)
  })

  it('should be able to get the user profile', async () => {
    const user = makeUser()

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      userId: user.id,
    })

    expect(result).toEqual({
      user: expect.objectContaining({
        id: expect.any(String),
      }),
    })
    expect(inMemoryUsersRepository.items).toHaveLength(1)
  })

  it('should not be possible to get the user profile if it does not exist', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-user-id',
      }),
    ).rejects.toEqual(new UserNotFoundError())
  })
})
