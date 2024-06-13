import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createProject } from '@/api/create-project'
import { ProjectDTO } from '@/api/dtos/project-dto'

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

const createProjectSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3).max(191),
})

type CreateProjectSchema = z.infer<typeof createProjectSchema>

export function CreateProject() {
  const queryClient = useQueryClient()

  const { mutateAsync: createProjectFn } = useMutation({
    mutationFn: createProject,
    onSuccess(newProject) {
      const cached = queryClient.getQueryData<ProjectDTO[]>(['projects'])

      if (cached) {
        queryClient.setQueryData<ProjectDTO[]>(
          ['projects'],
          [...cached, newProject],
        )
      }
    },
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
  })

  async function handleCreateProject(data: CreateProjectSchema) {
    try {
      await createProjectFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Projeto criado com sucesso!')
    } catch {
      toast.error('Falha ao criar o projeto, tente novamente!')
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

      <form onSubmit={handleSubmit(handleCreateProject)} className="space-y-6">
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
