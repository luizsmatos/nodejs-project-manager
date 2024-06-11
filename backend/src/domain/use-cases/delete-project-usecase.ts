import { ProjectsRepository } from '../repositories/projects-repository'
import { ProjectNotFoundError } from './errors/project-not-found-error'
import { UserNotAuthorizedError } from './errors/user-not-authorized-error'

interface DeleteProjectUseCaseRequest {
  userId: string
  projectId: string
}

export class DeleteProjectUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async execute({
    userId,
    projectId,
  }: DeleteProjectUseCaseRequest): Promise<void> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new ProjectNotFoundError()
    }

    if (project.userId !== userId) {
      throw new UserNotAuthorizedError()
    }

    await this.projectsRepository.delete(project)
  }
}
