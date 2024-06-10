import { faker } from '@faker-js/faker'

import { User } from '@/domain/entities/user'

export function makeUser(override: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: faker.date.past(),
    ...override,
  }
}
