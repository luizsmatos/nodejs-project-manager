import { PaginationParams } from '@/core/types/pagination-params'
import { Task } from '../entities/task'

export interface TasksRepository {
  findById(taskId: string): Promise<Task | null>
  findManyByProjectId(
    projectId: string,
    pagination: PaginationParams,
  ): Promise<Task[]>
  create(task: Task): Promise<void>
}
