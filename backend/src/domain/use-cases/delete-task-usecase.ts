import { TasksRepository } from '../repositories/tasks-repository'
import { TaskNotFoundError } from './errors/task-not-found-error'

interface DeleteTaskUseCaseRequest {
  taskId: string
}

export class DeleteTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({ taskId }: DeleteTaskUseCaseRequest): Promise<void> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new TaskNotFoundError()
    }

    await this.tasksRepository.delete(task)
  }
}
