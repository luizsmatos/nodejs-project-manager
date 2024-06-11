import { faker } from '@faker-js/faker'

import { Project } from '@/domain/entities/project'

export function makeProject(override: Partial<Project> = {}): Project {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.past(),
    updatedAt: null,
    ...override,
  }
}
