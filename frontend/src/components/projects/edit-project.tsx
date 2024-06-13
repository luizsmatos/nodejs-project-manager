import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { ProjectDTO } from '@/api/dtos/project-dto'
import { editProject } from '@/api/edit-project'

import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const editProjectSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3).max(191),
})

type EditProjectSchema = z.infer<typeof editProjectSchema>

interface EditProjectProps {
  project: ProjectDTO
}

export function EditProject({ project }: EditProjectProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: editProjectFn } = useMutation({
    mutationFn: editProject,
    onSuccess(updatedProject) {
      const cached = queryClient.getQueryData<ProjectDTO[]>(['projects'])

      if (cached) {
        const updated = cached.map((item) =>
          item.id === updatedProject.id ? updatedProject : item,
        )

        queryClient.setQueryData<ProjectDTO[]>(['projects'], updated)
      }
    },
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EditProjectSchema>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
    },
  })

  async function handleEditProject(data: EditProjectSchema) {
    try {
      await editProjectFn({
        project: {
          ...project,
          name: data.name,
          description: data.description,
        },
      })

      toast.success('Projeto editado com sucesso!')
    } catch {
      toast.error('Falha ao editar o projeto, tente novamente!')
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Novo Projeto</DialogTitle>
        <DialogDescription>
          Crie um novo projeto para organizar suas tarefas.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleEditProject)} className="space-y-6">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name">Nome</Label>
          <Input className="col-span-3" id="name" {...register('name')} />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            className="col-span-3 resize-none"
            {...register('description')}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
