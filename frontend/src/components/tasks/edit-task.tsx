import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TaskDTO } from '@/api/dtos/task-dto'
import { editTask } from '@/api/edit-task'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { TaskForm, TaskFormSchema } from './task-form'

interface EditTaskProps {
  task: TaskDTO
}

export function EditTask({ task }: EditTaskProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: editTaskFn } = useMutation({
    mutationFn: editTask,
    onSuccess(updatedTask) {
      const keys = ['tasks', { projectId: task.projectId }]
      const cached = queryClient.getQueryData<TaskDTO[]>(keys)

      if (cached) {
        const updated = cached.map((item) =>
          item.id === updatedTask.id ? updatedTask : item,
        )

        queryClient.setQueryData<TaskDTO[]>(keys, updated)
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

      toast.success('Projeto editado com sucesso!')
    } catch {
      toast.error('Falha ao editar o projeto, tente novamente!')
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
