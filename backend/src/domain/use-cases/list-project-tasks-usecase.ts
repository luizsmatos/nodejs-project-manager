import { Task } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

interface ListProjectTasksUseCaseRequest {
  projectId: string
  page: number
}

interface ListProjectTasksUseCaseResponse {
  tasks: Task[]
}

export class ListProjectTasksUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    projectId,
    page,
  }: ListProjectTasksUseCaseRequest): Promise<ListProjectTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findManyByProjectId(projectId, {
      page,
    })

    return {
      tasks,
    }
  }
}
