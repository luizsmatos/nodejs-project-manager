import { api } from '@/lib/axios'

interface ListUserProjectsResponse {
  projects: {
    id: string
    name: string
    description: string
    userId: string
    createdAt: string
    updatedAt: string | null
  }[]
}

export async function listUserProjects() {
  const response = await api.get<ListUserProjectsResponse>('/projects')

  return response.data.projects
}
