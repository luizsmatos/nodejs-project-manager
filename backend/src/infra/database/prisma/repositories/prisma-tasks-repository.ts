import { PaginationParams } from '@/core/types/pagination-params'
import { Task } from '@/domain/entities/task'
import { TasksRepository } from '@/domain/repositories/tasks-repository'
import { prisma } from '../prisma'
import { PrismaTaskMapper } from '../mappers/prisma-task-mapper'

export class PrismaTasksRepository implements TasksRepository {
  async findById(taskId: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })

    if (!task) {
      return null
    }

    return PrismaTaskMapper.toDomain(task)
  }

  async findManyByProjectId(
    projectId: string,
    { page }: PaginationParams,
  ): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },
      skip: (page - 1) * 20,
      take: page * 20,
      orderBy: {
        createdAt: 'asc',
      },
    })

    return tasks.map((task) => PrismaTaskMapper.toDomain(task))
  }

  async delete(task: Task): Promise<void> {
    await prisma.task.delete({
      where: {
        id: task.id,
      },
    })
  }

  async save(task: Task): Promise<void> {
    const data = PrismaTaskMapper.toPrisma(task)

    await prisma.task.update({
      where: {
        id: task.id,
      },
      data,
    })
  }

  async create(task: Task): Promise<void> {
    const data = PrismaTaskMapper.toPrisma(task)

    await prisma.task.create({
      data,
    })
  }
}
