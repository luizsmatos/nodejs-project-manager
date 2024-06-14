import { Task, TaskStatus } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

interface ListProjectTasksUseCaseRequest {
  projectId: string
  title?: string
  status?: TaskStatus
  page: number
}

interface ListProjectTasksUseCaseResponse {
  tasks: Task[]
  meta: {
    page: number
    perPage: number
    totalCount: number
  }
}

export class ListProjectTasksUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    projectId,
    title,
    status,
    page,
  }: ListProjectTasksUseCaseRequest): Promise<ListProjectTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findManyByProjectId(
      {
        projectId,
        title,
        status,
      },
      {
        page,
      },
    )

    return {
      tasks: tasks.data,
      meta: tasks.meta,
    }
  }
}
