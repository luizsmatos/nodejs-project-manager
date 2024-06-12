import { Task, TaskStatus } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'
import { TaskNotFoundError } from './errors/task-not-found-error'

interface EditTaskUseCaseRequest {
  taskId: string
  title?: string
  description?: string
  status?: TaskStatus
  completedBy?: string
}

interface EditTaskUseCaseResponse {
  task: Task
}

export class EditTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    taskId,
    title,
    description,
    status,
    completedBy,
  }: EditTaskUseCaseRequest): Promise<EditTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new TaskNotFoundError()
    }

    task.title = title ?? task.title
    task.description = description ?? task.description
    task.status = status ?? task.status
    task.completedBy = completedBy ?? null
    task.completedAt = completedBy ? new Date() : null
    task.updatedAt = new Date()

    await this.tasksRepository.save(task)

    return {
      task,
    }
  }
}
