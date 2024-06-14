import { api } from '@/lib/axios'

import { ProjectDTO } from './dtos/project-dto'

interface ListUserProjectsQuery {
  name?: string | null
  page?: number
}

export interface ListUserProjectsResponse {
  projects: ProjectDTO[]
  meta: {
    page: number
    perPage: number
    totalCount: number
  }
}

export async function listUserProjects({ name, page }: ListUserProjectsQuery) {
  const response = await api.get<ListUserProjectsResponse>('/projects', {
    params: {
      name,
      page,
    },
  })

  return response.data
}
