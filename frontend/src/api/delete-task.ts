import { api } from '@/lib/axios'

interface DeleteTaskBody {
  taskId: string
}

export async function deleteTask({ taskId }: DeleteTaskBody) {
  await api.delete(`/tasks/${taskId}`)
}
