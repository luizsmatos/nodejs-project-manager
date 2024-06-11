import { PrismaTasksRepository } from '@/infra/database/prisma/repositories/prisma-tasks-repository'
import { CreateTaskUseCase } from '../create-task-usecase'

export function makeCreateTaskUseCase(): CreateTaskUseCase {
  const tasksRepository = new PrismaTasksRepository()

  const useCase = new CreateTaskUseCase(tasksRepository)

  return useCase
}
