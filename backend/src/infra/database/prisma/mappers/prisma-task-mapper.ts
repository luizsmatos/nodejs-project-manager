import { Prisma, Task as PrismaTask } from '@prisma/client'
import { Task, TaskStatus } from '@/domain/entities/task'

export class PrismaTaskMapper {
  static toPrisma(task: Task): Prisma.TaskUncheckedCreateInput {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      completedBy: task.completedBy,
      completedAt: task.completedAt,
      projectId: task.projectId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }
  }

  static toDomain(raw: PrismaTask): Task {
    return {
      id: raw.id,
      title: raw.title,
      description: raw.description,
      status: raw.status as TaskStatus,
      completedBy: raw.completedBy,
      completedAt: raw.completedAt,
      projectId: raw.projectId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }
}
