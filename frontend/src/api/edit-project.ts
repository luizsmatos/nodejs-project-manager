import { api } from '@/lib/axios'

import { ProjectDTO } from './dtos/project-dto'

interface EditProjectBody {
  project: ProjectDTO
}

interface EditProjectResponse {
  project: ProjectDTO
}

export async function editProject({ project }: EditProjectBody) {
  const response = await api.put<EditProjectResponse>(
    `/projects/${project.id}`,
    {
      name: project.name,
      description: project.description,
    },
  )

  return response.data.project
}
