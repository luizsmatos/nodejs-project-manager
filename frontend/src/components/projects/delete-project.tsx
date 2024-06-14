import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteProject } from '@/api/delete-project'
import { ProjectDTO } from '@/api/dtos/project-dto'
import { ListUserProjectsResponse } from '@/api/list-user-projects'

import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

interface DeleteProjectProps {
  project: ProjectDTO
}

export function DeleteProject({ project }: DeleteProjectProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteProjectFn, isPending } = useMutation({
    mutationFn: deleteProject,
    onSuccess(_data, { projectId }) {
      const previousProjects =
        queryClient.getQueryData<ListUserProjectsResponse>(['projects'])

      if (previousProjects) {
        queryClient.setQueryData<ListUserProjectsResponse>(['projects'], {
          ...previousProjects,
          projects: previousProjects.projects.filter(
            (item) => item.id !== projectId,
          ),
        })
      }
    },
  })

  async function handleDeleteProject(projectId: string) {
    try {
      await deleteProjectFn({ projectId })

      toast.success('Projeto excluído com sucesso!')
    } catch {
      toast.error('Erro ao excluir o projeto!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Excluir projeto</DialogTitle>
        <DialogDescription>
          Essa ação não pode ser desfeita. Todos os dados relacionados a esse
          projeto serão perdidos.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </DialogClose>

        <Button
          type="button"
          disabled={isPending}
          onClick={() => handleDeleteProject(project.id)}
        >
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
