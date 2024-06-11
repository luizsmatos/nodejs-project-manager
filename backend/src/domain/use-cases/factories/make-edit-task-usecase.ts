import { PrismaTasksRepository } from '@/infra/database/prisma/repositories/prisma-tasks-repository'
import { EditTaskUseCase } from '../edit-task-usecase'

export function makeEditTaskUseCase(): EditTaskUseCase {
  const tasksRepository = new PrismaTasksRepository()

  const useCase = new EditTaskUseCase(tasksRepository)

  return useCase
}
