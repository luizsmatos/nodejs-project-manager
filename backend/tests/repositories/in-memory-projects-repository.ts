import {
  PaginationParams,
  PaginationResponse,
} from '@/core/types/pagination-params'
import { Project } from '@/domain/entities/project'
import {
  FindManyByUserIdParams,
  ProjectsRepository,
} from '@/domain/repositories/projects-repository'

export class InMemoryProjectsRepository implements ProjectsRepository {
  public items: Project[] = []

  async findById(projectId: string): Promise<Project | null> {
    const project = this.items.find((item) => item.id === projectId)

    return project ?? null
  }

  async findManyByUserId(
    { userId, name }: FindManyByUserIdParams,
    { page }: PaginationParams,
  ): Promise<PaginationResponse<Project>> {
    const projectsCount = this.items.filter(
      (item) => item.userId === userId,
    ).length
    const projects = this.items
      .filter((item) => item.userId === userId)
      .filter((item) => {
        if (!name) {
          return true
        }

        return item.name.toLowerCase().includes(name.toLowerCase())
      })
      .slice((page - 1) * 10, page * 10)

    return {
      data: projects,
      meta: {
        page,
        perPage: 10,
        totalCount: projectsCount,
      },
    }
  }

  async create(project: Project): Promise<void> {
    this.items.push(project)
  }

  async save(project: Project): Promise<void> {
    const index = this.items.findIndex((item) => item.id === project.id)

    this.items[index] = project
  }

  async delete(project: Project): Promise<void> {
    this.items = this.items.filter((item) => item.id !== project.id)
  }
}
