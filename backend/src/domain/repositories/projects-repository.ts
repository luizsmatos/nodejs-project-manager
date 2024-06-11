import { PaginationParams } from '@/core/types/pagination-params'

import { Project } from '../entities/project'

export interface ProjectsRepository {
  findById(projectId: string): Promise<Project | null>
  findManyByUserId(
    userId: string,
    pagination: PaginationParams,
  ): Promise<Project[]>
  save(project: Project): Promise<void>
  create(project: Project): Promise<void>
}
