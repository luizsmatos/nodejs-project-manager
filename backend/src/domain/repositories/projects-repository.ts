import {
  PaginationParams,
  PaginationResponse,
} from '@/core/types/pagination-params'

import { Project } from '../entities/project'

export interface FindManyByUserIdParams {
  userId: string
  name?: string
}

export interface ProjectsRepository {
  findById(projectId: string): Promise<Project | null>
  findManyByUserId(
    params: FindManyByUserIdParams,
    pagination: PaginationParams,
  ): Promise<PaginationResponse<Project>>
  delete(project: Project): Promise<void>
  save(project: Project): Promise<void>
  create(project: Project): Promise<void>
}
