import { api } from '@/lib/axios'

import { ProjectDTO } from './dtos/project-dto'

interface GetProjectByIdParams {
  projectId: string
}

interface GetProjectByIdResponse {
  project: ProjectDTO
}

export async function getProjectById({ projectId }: GetProjectByIdParams) {
  const response = await api.get<GetProjectByIdResponse>(
    `/projects/${projectId}`,
  )

  return response.data.project
}
