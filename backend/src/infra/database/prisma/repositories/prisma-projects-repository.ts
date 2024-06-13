import { PaginationParams } from '@/core/types/pagination-params'
import { Project } from '@/domain/entities/project'
import { ProjectsRepository } from '@/domain/repositories/projects-repository'
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
    userId: string,
    { page }: PaginationParams,
  ): Promise<Project[]> {
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * 20,
      take: page * 20,
      orderBy: {
        createdAt: 'asc',
      },
    })

    return projects.map((project) => PrismaProjectMapper.toDomain(project))
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
