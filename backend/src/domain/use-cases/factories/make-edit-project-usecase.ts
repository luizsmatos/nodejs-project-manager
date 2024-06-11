import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'
import { EditProjectUseCase } from '../edit-project-usecase'

export function makeEditProjectUseCase(): EditProjectUseCase {
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new EditProjectUseCase(projectsRepository)

  return useCase
}
