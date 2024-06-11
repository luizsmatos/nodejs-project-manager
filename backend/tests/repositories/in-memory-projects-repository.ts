import { PaginationParams } from '@/core/types/pagination-params'
import { Project } from '@/domain/entities/project'
import { ProjectsRepository } from '@/domain/repositories/projects-repository'

export class InMemoryProjectsRepository implements ProjectsRepository {
  public items: Project[] = []

  async findManyByUserId(
    userId: string,
    { page }: PaginationParams,
  ): Promise<Project[]> {
    const projects = this.items
      .filter((item) => item.userId === userId)
      .slice((page - 1) * 20, page * 20)

    return projects
  }
}
