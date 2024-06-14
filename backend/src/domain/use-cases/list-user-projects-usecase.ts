import { Project } from '../entities/project'
import { ProjectsRepository } from '../repositories/projects-repository'

interface ListUserProjectsUseCaseRequest {
  userId: string
  name?: string
  page: number
}

interface ListUserProjectsUseCaseResponse {
  projects: Project[]
  meta: {
    page: number
    perPage: number
    totalCount: number
  }
}

export class ListUserProjectsUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async execute({
    userId,
    name,
    page,
  }: ListUserProjectsUseCaseRequest): Promise<ListUserProjectsUseCaseResponse> {
    const projects = await this.projectsRepository.findManyByUserId(
      {
        userId,
        name,
      },
      {
        page,
      },
    )

    return {
      projects: projects.data,
      meta: projects.meta,
    }
  }
}
