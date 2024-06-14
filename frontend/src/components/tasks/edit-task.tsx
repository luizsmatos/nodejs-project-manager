import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

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
}

export function EditTask({ task }: EditTaskProps) {
  const [searchParams] = useSearchParams()
  const page = z.coerce.number().parse(searchParams.get('page') ?? 1)

  const queryClient = useQueryClient()

  const { mutateAsync: editTaskFn } = useMutation({
    mutationFn: editTask,
    onSuccess(updatedTask) {
      const keys = ['tasks', task.projectId, page]
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
