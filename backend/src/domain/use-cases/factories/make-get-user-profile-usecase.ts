import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile-usecase'

export function makeGetUserProfileUseCase(): GetUserProfileUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
