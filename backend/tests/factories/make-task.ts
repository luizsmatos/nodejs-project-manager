import { faker } from '@faker-js/faker'

import { Task, TaskStatus } from '@/domain/entities/task'

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
