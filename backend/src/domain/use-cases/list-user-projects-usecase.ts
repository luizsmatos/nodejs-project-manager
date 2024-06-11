import { Project } from '../entities/project'
import { ProjectsRepository } from '../repositories/projects-repository'

interface ListUserProjectsUseCaseRequest {
  userId: string
  page: number
}

interface ListUserProjectsUseCaseResponse {
  projects: Project[]
}

export class ListUserProjectsUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async execute({
    userId,
    page,
  }: ListUserProjectsUseCaseRequest): Promise<ListUserProjectsUseCaseResponse> {
    const projects = await this.projectsRepository.findManyByUserId(userId, {
      page,
    })

    return {
      projects,
    }
  }
}
