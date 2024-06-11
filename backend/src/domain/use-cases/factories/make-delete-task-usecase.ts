import { PrismaTasksRepository } from '@/infra/database/prisma/repositories/prisma-tasks-repository'
import { DeleteTaskUseCase } from '../delete-task-usecase'

export function makeDeleteTaskUseCase(): DeleteTaskUseCase {
  const tasksRepository = new PrismaTasksRepository()

  const useCase = new DeleteTaskUseCase(tasksRepository)

  return useCase
}
