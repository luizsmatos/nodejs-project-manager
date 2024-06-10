import { FakerHasher } from '#/cryptography/faker-hasher'
import { makeUser } from '#/factories/make-user'
import { InMemoryUsersRepository } from '#/repositories/in-memory-users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUserUseCase } from './register-user-usecase'

let sut: RegisterUserUseCase
let inMemoryUsersRepository: InMemoryUsersRepository
let fakerHasher: FakerHasher

describe('Register User UseCase', () => {
  beforeEach(() => {
    fakerHasher = new FakerHasher()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(inMemoryUsersRepository, fakerHasher)
  })

  it('should be able to register a new user', async () => {
    const result = await sut.execute({
      name: 'Adeline Woods',
      email: 'gavur@aw.bm',
      password: '6hliR1Sw',
    })

    const hashedPassword = await fakerHasher.hash('6hliR1Sw')

    expect(result).toEqual({
      user: expect.objectContaining({
        id: expect.any(String),
      }),
    })
    expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should not be able to register a new user with an email that is already in use', async () => {
    const email = 'gavur@aw.bm'
    await inMemoryUsersRepository.create(makeUser({ email }))

    await expect(
      sut.execute({
        name: 'Adeline Woods',
        email: 'gavur@aw.bm',
        password: '6hliR1Sw',
      }),
    ).rejects.toEqual(new UserAlreadyExistsError(email))
  })
})
