import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'
import { PrismaTasksRepository } from '@/infra/database/prisma/repositories/prisma-tasks-repository'
import { CreateTaskUseCase } from '../create-task-usecase'

export function makeCreateTaskUseCase(): CreateTaskUseCase {
  const projectsRepository = new PrismaProjectsRepository()
  const tasksRepository = new PrismaTasksRepository()

  const useCase = new CreateTaskUseCase(projectsRepository, tasksRepository)

  return useCase
}
