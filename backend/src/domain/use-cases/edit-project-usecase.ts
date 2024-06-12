import { Project } from '../entities/project'
import { ProjectsRepository } from '../repositories/projects-repository'
import { ProjectNotFoundError } from './errors/project-not-found-error'
import { UserNotAuthorizedError } from './errors/user-not-authorized-error'

interface EditProjectUseCaseRequest {
  userId: string
  projectId: string
  name?: string
  description?: string
}

interface EditProjectUseCaseResponse {
  project: Project
}

export class EditProjectUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async execute({
    userId,
    projectId,
    name,
    description,
  }: EditProjectUseCaseRequest): Promise<EditProjectUseCaseResponse> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new ProjectNotFoundError()
    }

    if (project.userId !== userId) {
      throw new UserNotAuthorizedError()
    }

    project.name = name ?? project.name
    project.description = description ?? project.description
    project.updatedAt = new Date()

    await this.projectsRepository.save(project)

    return {
      project,
    }
  }
}
