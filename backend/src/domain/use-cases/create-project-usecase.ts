import { randomUUID } from 'node:crypto'

import { Project } from '../entities/project'
import { ProjectsRepository } from '../repositories/projects-repository'

interface CreateProjectUseCaseRequest {
  userId: string
  name: string
  description: string
}

interface CreateProjectUseCaseResponse {
  project: Project
}

export class CreateProjectUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async execute({
    userId,
    name,
    description,
  }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {
    const project: Project = {
      id: randomUUID(),
      userId,
      name,
      description,
      createdAt: new Date(),
      updatedAt: null,
    }

    await this.projectsRepository.create(project)

    return {
      project,
    }
  }
}
