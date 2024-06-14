import {
  PaginationParams,
  PaginationResponse,
} from '@/core/types/pagination-params'
import { Task } from '@/domain/entities/task'
import {
  FindManyByProjectIdParams,
  TasksRepository,
} from '@/domain/repositories/tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async findById(taskId: string): Promise<Task | null> {
    const task = this.items.find((item) => item.id === taskId)

    return task ?? null
  }

  async findManyByProjectId(
    { projectId, title, status }: FindManyByProjectIdParams,
    { page }: PaginationParams,
  ): Promise<PaginationResponse<Task>> {
    const tasksCount = this.items.filter(
      (item) => item.projectId === projectId,
    ).length
    const tasks = this.items
      .filter((item) => item.projectId === projectId)
      .filter((item) => {
        if (!title) {
          return true
        }

        return item.title.toLowerCase().includes(title.toLowerCase())
      })
      .filter((item) => {
        if (!status) {
          return true
        }

        return item.status === status
      })
      .slice((page - 1) * 10, page * 10)

    return {
      data: tasks,
      meta: {
        page,
        perPage: 10,
        totalCount: tasksCount,
      },
    }
  }

  async delete(task: Task): Promise<void> {
    this.items = this.items.filter((item) => item.id !== task.id)
  }

  async save(task: Task): Promise<void> {
    const index = this.items.findIndex((item) => item.id === task.id)

    this.items[index] = task
  }

  async create(task: Task): Promise<void> {
    this.items.push(task)
  }
}
