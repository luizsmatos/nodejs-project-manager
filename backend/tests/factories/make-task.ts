import { faker } from '@faker-js/faker'

import { Task, TaskStatus } from '@/domain/entities/task'
import { PrismaTaskMapper } from '@/infra/database/prisma/mappers/prisma-task-mapper'
import { prisma } from '@/infra/database/prisma/prisma'

export function makeTask(override: Partial<Task> = {}): Task {
  return {
    id: faker.string.uuid(),
    projectId: faker.string.uuid(),
    title: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    status: TaskStatus.PENDING,
    completedBy: null,
    completedAt: null,
    createdAt: faker.date.past(),
    updatedAt: null,
    ...override,
  }
}

export class TaskFactory {
  static async makePrismaTask(override: Partial<Task> = {}): Promise<Task> {
    const Task = makeTask(override)
    await prisma.task.create({
      data: PrismaTaskMapper.toPrisma(Task),
    })

    return Task
  }
}
