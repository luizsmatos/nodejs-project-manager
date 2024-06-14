import {
  PaginationParams,
  PaginationResponse,
} from '@/core/types/pagination-params'
import { Project } from '@/domain/entities/project'
import {
  FindManyByUserIdParams,
  ProjectsRepository,
} from '@/domain/repositories/projects-repository'
import { prisma } from '../prisma'
import { PrismaProjectMapper } from '../mappers/prisma-project-mapper'

export class PrismaProjectsRepository implements ProjectsRepository {
  async findById(projectId: string): Promise<Project | null> {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    })

    if (!project) {
      return null
    }

    return PrismaProjectMapper.toDomain(project)
  }

  async findManyByUserId(
    { userId, name }: FindManyByUserIdParams,
    { page }: PaginationParams,
  ): Promise<PaginationResponse<Project>> {
    const projectsCount = prisma.project.count({ where: { userId } })
    const projects = prisma.project.findMany({
      where: {
        userId,
        name: {
          contains: name,
        },
      },
      skip: (page - 1) * 10,
      take: page * 10,
      orderBy: {
        createdAt: 'asc',
      },
    })

    const [total, data] = await prisma.$transaction([projectsCount, projects])

    return {
      data: data.map(PrismaProjectMapper.toDomain),
      meta: {
        page,
        perPage: 10,
        totalCount: total,
      },
    }
  }

  async delete(project: Project): Promise<void> {
    await prisma.project.delete({
      where: {
        id: project.id,
      },
    })
  }

  async save(project: Project): Promise<void> {
    const data = PrismaProjectMapper.toPrisma(project)

    await prisma.project.update({
      where: {
        id: project.id,
      },
      data,
    })
  }

  async create(project: Project): Promise<void> {
    const data = PrismaProjectMapper.toPrisma(project)

    await prisma.project.create({
      data,
    })
  }
}
