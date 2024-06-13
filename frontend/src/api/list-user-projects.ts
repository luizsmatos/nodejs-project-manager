import { api } from '@/lib/axios'

import { ProjectDTO } from './dtos/project-dto'

export interface ListUserProjectsResponse {
  projects: ProjectDTO[]
}

export async function listUserProjects() {
  const response = await api.get<ListUserProjectsResponse>('/projects')

  return response.data.projects
}
