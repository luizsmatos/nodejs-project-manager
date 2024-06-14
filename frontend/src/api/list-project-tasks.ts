import { api } from '@/lib/axios'

import { TaskDTO } from './dtos/task-dto'

interface ListProjectTasksBody {
  projectId: string
}

interface ListProjectTasksResponse {
  tasks: TaskDTO[]
}

export async function listProjectTasks({ projectId }: ListProjectTasksBody) {
  const response = await api.get<ListProjectTasksResponse>(
    `/projects/${projectId}/tasks`,
    {
      params: {
        page: 1,
      },
    },
  )

  return response.data.tasks
}
