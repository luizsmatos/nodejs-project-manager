import { api } from '@/lib/axios'

import { TaskDTO } from './dtos/task-dto'

interface EditTaskBody {
  id: string
  title: string
  description: string
  status: string
}

interface EditTaskResponse {
  task: TaskDTO
}

export async function editTask({
  id,
  title,
  description,
  status,
}: EditTaskBody) {
  const response = await api.put<EditTaskResponse>(`/tasks/${id}`, {
    title,
    description,
    status,
  })

  return response.data.task
}
