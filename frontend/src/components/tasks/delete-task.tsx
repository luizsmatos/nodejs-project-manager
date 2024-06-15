import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteTask } from '@/api/delete-task'
import { TaskDTO } from '@/api/dtos/task-dto'
import { ListProjectTasksResponse } from '@/api/list-project-tasks'

import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

interface DeleteTaskProps {
  task: TaskDTO
  onClose: () => void
}

export function DeleteTask({ task, onClose }: DeleteTaskProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteTaskFn, isPending } = useMutation({
    mutationFn: deleteTask,
    onSuccess(_data, { taskId }) {
      const keys = ['tasks', task.projectId]
      const previousTasks =
        queryClient.getQueryData<ListProjectTasksResponse>(keys)

      if (previousTasks) {
        queryClient.setQueryData<ListProjectTasksResponse>(keys, {
          ...previousTasks,
          tasks: previousTasks.tasks.filter((item) => item.id !== taskId),
        })
      }
    },
  })

  async function handleDeleteTask(taskId: string) {
    try {
      await deleteTaskFn({ taskId })

      toast.success('Tarefa excluída com sucesso!')
      onClose()
    } catch {
      toast.error('Erro ao excluir a tarefa, tente novamente!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Excluir tarefa</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja excluir essa tarefa?
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>

          <Button
            type="submit"
            disabled={isPending}
            onClick={() => handleDeleteTask(task.id)}
          >
            Excluir
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  )
}
