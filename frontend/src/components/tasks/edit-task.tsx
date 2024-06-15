import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TaskDTO } from '@/api/dtos/task-dto'
import { editTask } from '@/api/edit-task'
import { ListProjectTasksResponse } from '@/api/list-project-tasks'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { TaskForm, TaskFormSchema } from './task-form'

interface EditTaskProps {
  task: TaskDTO
  onClose: () => void
}

export function EditTask({ task, onClose }: EditTaskProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: editTaskFn } = useMutation({
    mutationFn: editTask,
    onSuccess(updatedTask) {
      const keys = ['tasks', task.projectId]
      const previousTasks =
        queryClient.getQueryData<ListProjectTasksResponse>(keys)

      if (previousTasks) {
        queryClient.setQueryData<ListProjectTasksResponse>(keys, {
          ...previousTasks,
          tasks: previousTasks.tasks.map((item) =>
            item.id === updatedTask.id ? updatedTask : item,
          ),
        })
      }
    },
  })

  async function handleEditTask(data: TaskFormSchema) {
    try {
      await editTaskFn({
        id: task.id,
        title: data.title,
        description: data.description,
        status: data.status,
      })

      toast.success('Tarefa editada com sucesso!')
      onClose()
    } catch {
      toast.error('Erro ao editar a tarefa, tente novamente!')
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Editar tarefa</DialogTitle>
        <DialogDescription>Edite os detalhes da tarefa</DialogDescription>
      </DialogHeader>

      <TaskForm initialValues={task} onSubmit={handleEditTask} />
    </DialogContent>
  )
}
