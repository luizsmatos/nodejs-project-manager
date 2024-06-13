import { randomUUID } from 'node:crypto'

import { Task, TaskStatus } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'
import { ProjectsRepository } from '../repositories/projects-repository'
import { ProjectNotFoundError } from './errors/project-not-found-error'

interface CreateTaskUseCaseRequest {
  projectId: string
  title: string
  description: string
  status: TaskStatus
  userId: string
}

interface CreateTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly tasksRepository: TasksRepository,
  ) {}

  async execute({
    projectId,
    title,
    description,
    status,
    userId,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new ProjectNotFoundError()
    }

    const taskCompleted = status === TaskStatus.DONE
    const task: Task = {
      id: randomUUID(),
      projectId,
      title,
      description,
      status,
      completedBy: taskCompleted ? userId : null,
      completedAt: taskCompleted ? new Date() : null,
      createdAt: new Date(),
      updatedAt: null,
    }

    await this.tasksRepository.create(task)

    return {
      task,
    }
  }
}
