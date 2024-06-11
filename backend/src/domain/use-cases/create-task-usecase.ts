import { randomUUID } from 'node:crypto'

import { Task, TaskStatus } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

interface CreateTaskUseCaseRequest {
  projectId: string
  title: string
  description: string
}

interface CreateTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    projectId,
    title,
    description,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task: Task = {
      id: randomUUID(),
      projectId,
      title,
      description,
      status: TaskStatus.PENDING,
      completedBy: null,
      completedAt: null,
      createdAt: new Date(),
      updatedAt: null,
    }

    await this.tasksRepository.create(task)

    return {
      task,
    }
  }
}
