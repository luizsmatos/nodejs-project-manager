import { Project } from '../entities/project'
import { ProjectsRepository } from '../repositories/projects-repository'
import { ProjectNotFoundError } from './errors/project-not-found-error'

interface GetProjectByIdUseCaseRequest {
  projectId: string
}

interface GetProjectByIdUseCaseResponse {
  project: Project
}

export class GetProjectByIdUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    projectId,
  }: GetProjectByIdUseCaseRequest): Promise<GetProjectByIdUseCaseResponse> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new ProjectNotFoundError()
    }

    return {
      project,
    }
  }
}
