import { faker } from '@faker-js/faker'

import { User } from '@/domain/entities/user'
import { prisma } from '@/infra/database/prisma/prisma'
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper'

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

export class UserFactory {
  static async makePrismaUser(override: Partial<User> = {}): Promise<User> {
    const user = makeUser(override)
    await prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    })

    return user
  }
}
