import { faker } from '@faker-js/faker'

import { Project } from '@/domain/entities/project'
import { PrismaProjectMapper } from '@/infra/database/prisma/mappers/prisma-project-mapper'
import { prisma } from '@/infra/database/prisma/prisma'

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

export class ProjectFactory {
  static async makePrismaProject(
    override: Partial<Project> = {},
  ): Promise<Project> {
    const Project = makeProject(override)
    await prisma.project.create({
      data: PrismaProjectMapper.toPrisma(Project),
    })

    return Project
  }
}
