import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'
import { CreateProjectUseCase } from '../create-project-usecase'

export function makeCreateProjectUseCase(): CreateProjectUseCase {
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new CreateProjectUseCase(projectsRepository)

  return useCase
}
