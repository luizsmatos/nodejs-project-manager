import { PaginationParams } from '@/core/types/pagination-params'
import { Task } from '@/domain/entities/task'
import { TasksRepository } from '@/domain/repositories/tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async findManyByProjectId(
    projectId: string,
    { page }: PaginationParams,
  ): Promise<Task[]> {
    const tasks = this.items
      .filter((item) => item.projectId === projectId)
      .slice((page - 1) * 20, page * 20)

    return tasks
  }
}
