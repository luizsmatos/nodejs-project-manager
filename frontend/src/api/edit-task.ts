import { api } from '@/lib/axios'

import { TaskDTO } from './dtos/task-dto'

interface EditTaskBody {
  task: {
    id: string
    title: string
    description: string
    status: string
    completedBy: string | null
  }
}

interface EditTaskResponse {
  task: TaskDTO
}

export async function editTask({ task }: EditTaskBody) {
  const response = await api.put<EditTaskResponse>(`/tasks/${task.id}`, {
    title: task.title,
    description: task.description,
    status: task.status,
    completedBy: task.completedBy,
  })

  return response.data.task
}
