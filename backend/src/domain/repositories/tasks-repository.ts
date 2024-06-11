import { PaginationParams } from '@/core/types/pagination-params'
import { Task } from '../entities/task'

export interface TasksRepository {
  findManyByProjectId(
    projectId: string,
    pagination: PaginationParams,
  ): Promise<Task[]>
  create(task: Task): Promise<void>
}
