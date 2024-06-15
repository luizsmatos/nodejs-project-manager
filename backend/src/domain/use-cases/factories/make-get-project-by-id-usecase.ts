import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'
import { GetProjectByIdUseCase } from '../get-project-by-id-usecase'

export function makeGetProjectByIdUseCase(): GetProjectByIdUseCase {
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new GetProjectByIdUseCase(projectsRepository)

  return useCase
}
