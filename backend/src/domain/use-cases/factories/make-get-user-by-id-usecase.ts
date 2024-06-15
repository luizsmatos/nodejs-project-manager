import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { GetUserByIdUseCase } from '../get-user-by-id-usecase'

export function makeGetUserByIdUseCase(): GetUserByIdUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new GetUserByIdUseCase(usersRepository)

  return useCase
}
