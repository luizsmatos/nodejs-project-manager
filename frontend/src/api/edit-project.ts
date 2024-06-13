import { api } from '@/lib/axios'

import { ProjectDTO } from './dtos/project-dto'

interface EditProjectBody {
  project: ProjectDTO
}

export async function editProject({ project }: EditProjectBody) {
  await api.put<EditProjectBody>(`/projects/${project.id}`, {
    name: project.name,
    description: project.description,
  })
}
