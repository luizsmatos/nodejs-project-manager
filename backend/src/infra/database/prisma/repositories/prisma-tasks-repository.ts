import {
  PaginationParams,
  PaginationResponse,
} from '@/core/types/pagination-params'
import { Task } from '@/domain/entities/task'
import {
  FindManyByProjectIdParams,
  TasksRepository,
} from '@/domain/repositories/tasks-repository'
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
    { projectId, title, status }: FindManyByProjectIdParams,
    { page }: PaginationParams,
  ): Promise<PaginationResponse<Task>> {
    const tasksCount = prisma.task.count({ where: { projectId } })
    const tasks = prisma.task.findMany({
      where: {
        projectId,
        title: {
          contains: title,
        },
        status,
      },
      skip: (page - 1) * 10,
      take: page * 10,
      orderBy: {
        createdAt: 'asc',
      },
    })

    const [total, data] = await prisma.$transaction([tasksCount, tasks])

    return {
      data: data.map(PrismaTaskMapper.toDomain),
      meta: {
        page,
        perPage: 10,
        totalCount: total,
      },
    }
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
