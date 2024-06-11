import { Prisma, Project as PrismaProject } from '@prisma/client'
import { Project } from '@/domain/entities/project'

export class PrismaProjectMapper {
  static toPrisma(project: Project): Prisma.ProjectUncheckedCreateInput {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      userId: project.userId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }
  }

  static toDomain(raw: PrismaProject): Project {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
      userId: raw.userId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }
}
