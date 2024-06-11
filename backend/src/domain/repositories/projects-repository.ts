import { PaginationParams } from '@/core/types/pagination-params'

import { Project } from '../entities/project'

export interface ProjectsRepository {
  findManyByUserId(
    userId: string,
    pagination: PaginationParams,
  ): Promise<Project[]>
  create(project: Project): Promise<void>
}
