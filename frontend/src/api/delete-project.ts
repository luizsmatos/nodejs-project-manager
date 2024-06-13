import { api } from '@/lib/axios'

interface DeleteProjectBody {
  projectId: string
}

export async function deleteProject({ projectId }: DeleteProjectBody) {
  await api.delete(`/projects/${projectId}`)
}
