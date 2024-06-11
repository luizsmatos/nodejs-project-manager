import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { BcryptHasher } from '@/infra/cryptography/impl/bcrypt-hasher'
import { AuthenticateUserUseCase } from '../authenticate-user-usecase'
import { JwtEncrypter } from '@/infra/cryptography/impl/jwt-encrypter'

export function makeAuthenticateUserUseCase(): AuthenticateUserUseCase {
  const usersRepository = new PrismaUsersRepository()
  const hasher = new BcryptHasher()
  const encrypter = new JwtEncrypter()

  const useCase = new AuthenticateUserUseCase(
    usersRepository,
    hasher,
    encrypter,
  )

  return useCase
}
