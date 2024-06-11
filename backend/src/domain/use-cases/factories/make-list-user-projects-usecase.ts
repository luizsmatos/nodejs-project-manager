import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'
import { ListUserProjectsUseCase } from '../list-user-projects-usecase'

export function makeListUserProjectsUseCase(): ListUserProjectsUseCase {
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new ListUserProjectsUseCase(projectsRepository)

  return useCase
}
