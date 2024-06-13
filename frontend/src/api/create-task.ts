import { api } from '@/lib/axios'

import { EnumTaskStatus, TaskDTO } from './dtos/task-dto'

interface CreateTaskBody {
  projectId: string
  title: string
  description: string
  status: EnumTaskStatus
}

interface CreateTaskResponse {
  task: TaskDTO
}

export async function createTask({
  projectId,
  title,
  description,
  status,
}: CreateTaskBody) {
  const response = await api.post<CreateTaskResponse>(
    `/projects/${projectId}/tasks`,
    {
      title,
      description,
      status,
    },
  )

  return response.data.task
}
