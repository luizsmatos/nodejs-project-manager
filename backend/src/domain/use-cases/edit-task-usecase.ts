import { Task, TaskStatus } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'
import { TaskNotFoundError } from './errors/task-not-found-error'

interface EditTaskUseCaseRequest {
  taskId: string
  title?: string
  description?: string
  status?: TaskStatus
  userId: string
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
    userId,
  }: EditTaskUseCaseRequest): Promise<EditTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new TaskNotFoundError()
    }

    const taskCompleted = status === TaskStatus.DONE

    task.title = title ?? task.title
    task.description = description ?? task.description
    task.status = status ?? task.status
    task.completedBy = taskCompleted ? userId : null
    task.completedAt = taskCompleted ? new Date() : null
    task.updatedAt = new Date()

    await this.tasksRepository.save(task)

    return {
      task,
    }
  }
}
