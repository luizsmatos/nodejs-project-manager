import { api } from '@/lib/axios'

import { ProjectDTO } from './dtos/project-dto'

interface CreateProjectBody {
  name: string
  description: string
}

interface CreateProjectResponse {
  project: ProjectDTO
}

export async function createProject({ name, description }: CreateProjectBody) {
  const response = await api.post<CreateProjectResponse>('/projects', {
    name,
    description,
  })

  return response.data.project
}
