import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'
import { DeleteProjectUseCase } from '../delete-project-usecase'

export function makeDeleteProjectUseCase(): DeleteProjectUseCase {
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new DeleteProjectUseCase(projectsRepository)

  return useCase
}
