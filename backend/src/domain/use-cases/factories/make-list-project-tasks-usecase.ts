import { PrismaTasksRepository } from '@/infra/database/prisma/repositories/prisma-tasks-repository'
import { ListProjectTasksUseCase } from '../list-project-tasks-usecase'

export function makeListProjectTasksUseCase(): ListProjectTasksUseCase {
  const tasksRepository = new PrismaTasksRepository()

  const useCase = new ListProjectTasksUseCase(tasksRepository)

  return useCase
}
