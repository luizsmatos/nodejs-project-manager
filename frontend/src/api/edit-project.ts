import { api } from '@/lib/axios'

import { ProjectDTO } from './dtos/project-dto'

interface EditProjectBody {
  id: string
  name: string
  description: string
}

interface EditProjectResponse {
  project: ProjectDTO
}

export async function editProject({ id, name, description }: EditProjectBody) {
  const response = await api.put<EditProjectResponse>(`/projects/${id}`, {
    name,
    description,
  })

  return response.data.project
}
