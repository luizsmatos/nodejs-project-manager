import { PaginationParams } from '@/core/types/pagination-params'
import { Task } from '@/domain/entities/task'
import { TasksRepository } from '@/domain/repositories/tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async findById(taskId: string): Promise<Task | null> {
    const task = this.items.find((item) => item.id === taskId)

    return task ?? null
  }

  async findManyByProjectId(
    projectId: string,
    { page }: PaginationParams,
  ): Promise<Task[]> {
    const tasks = this.items
      .filter((item) => item.projectId === projectId)
      .slice((page - 1) * 20, page * 20)

    return tasks
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
