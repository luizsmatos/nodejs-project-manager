import { PaginationParams } from '@/core/types/pagination-params'
import { Project } from '@/domain/entities/project'
import { ProjectsRepository } from '@/domain/repositories/projects-repository'

export class InMemoryProjectsRepository implements ProjectsRepository {
  public items: Project[] = []

  async findById(projectId: string): Promise<Project | null> {
    const project = this.items.find((item) => item.id === projectId)

    return project ?? null
  }

  async findManyByUserId(
    userId: string,
    { page }: PaginationParams,
  ): Promise<Project[]> {
    const projects = this.items
      .filter((item) => item.userId === userId)
      .slice((page - 1) * 20, page * 20)

    return projects
  }

  async create(project: Project): Promise<void> {
    this.items.push(project)
  }

  async save(project: Project): Promise<void> {
    const index = this.items.findIndex((item) => item.id === project.id)

    this.items[index] = project
  }
}
