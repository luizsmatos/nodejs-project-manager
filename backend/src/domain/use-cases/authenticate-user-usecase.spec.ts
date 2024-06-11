import { FakerEncrypter } from '#/cryptography/faker-encrypter'
import { FakerHasher } from '#/cryptography/faker-hasher'
import { makeUser } from '#/factories/make-user'
import { InMemoryUsersRepository } from '#/repositories/in-memory-users-repository'

import { AuthenticateUserUseCase } from './authenticate-user-usecase'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let sut: AuthenticateUserUseCase
let inMemoryUsersRepository: InMemoryUsersRepository
let fakerHasher: FakerHasher
let fakerEncrypter: FakerEncrypter

describe('Authenticate User UseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakerHasher = new FakerHasher()
    fakerEncrypter = new FakerEncrypter()

    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakerHasher,
      fakerEncrypter,
    )
  })

  it('should be able to authenticate a user', async () => {
    const user = makeUser({
      email: 'nectiz@maphi.nu',
      password: await fakerHasher.hash('123456'),
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email: 'nectiz@maphi.nu',
      password: '123456',
    })

    expect(result).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate a user with invalid email', async () => {
    await expect(
      sut.execute({
        email: 'invalid_email',
        password: '123456',
      }),
    ).rejects.toEqual(new WrongCredentialsError())
  })

  it('should not be able to authenticate a user with invalid password', async () => {
    const user = makeUser({
      email: 'nectiz@maphi.nu',
      password: await fakerHasher.hash('123456'),
    })

    await inMemoryUsersRepository.create(user)

    await expect(
      sut.execute({
        email: 'nectiz@maphi.nu',
        password: '1234567',
      }),
    ).rejects.toEqual(new WrongCredentialsError())
  })
})
