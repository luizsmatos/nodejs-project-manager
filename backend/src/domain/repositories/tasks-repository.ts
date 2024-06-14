import {
  PaginationParams,
  PaginationResponse,
} from '@/core/types/pagination-params'
import { Task, TaskStatus } from '../entities/task'

export interface FindManyByProjectIdParams {
  projectId: string
  title?: string
  status?: TaskStatus
}

export interface TasksRepository {
  findById(taskId: string): Promise<Task | null>
  findManyByProjectId(
    params: FindManyByProjectIdParams,
    pagination: PaginationParams,
  ): Promise<PaginationResponse<Task>>
  delete(task: Task): Promise<void>
  save(task: Task): Promise<void>
  create(task: Task): Promise<void>
}
