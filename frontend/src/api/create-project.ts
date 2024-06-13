import { api } from '@/lib/axios'

interface CreateProjectBody {
  name: string
  description: string
}

export async function createProject({ name, description }: CreateProjectBody) {
  await api.post<CreateProjectBody>('/projects', {
    name,
    description,
  })
}
