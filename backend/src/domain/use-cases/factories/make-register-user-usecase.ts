import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { BcryptHasher } from '@/infra/cryptography/impl/bcrypt-hasher'
import { RegisterUserUseCase } from '../register-user-usecase'

export function makeRegisterUserUseCase(): RegisterUserUseCase {
  const usersRepository = new PrismaUsersRepository()
  const hasher = new BcryptHasher()

  const useCase = new RegisterUserUseCase(usersRepository, hasher)

  return useCase
}
