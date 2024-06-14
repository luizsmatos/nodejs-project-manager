import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createProject } from '@/api/create-project'
import { ListUserProjectsResponse } from '@/api/list-user-projects'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { ProjectForm, ProjectFormSchema } from './project-form'

export function CreateProject() {
  const queryClient = useQueryClient()

  const { mutateAsync: createProjectFn } = useMutation({
    mutationFn: createProject,
    onSuccess(newProject) {
      const previousProjects =
        queryClient.getQueryData<ListUserProjectsResponse>(['projects'])

      if (previousProjects) {
        queryClient.setQueryData<ListUserProjectsResponse>(['projects'], {
          ...previousProjects,
          projects: [...previousProjects.projects, newProject],
        })
      }
    },
  })

  async function handleCreateProject(data: ProjectFormSchema) {
    try {
      await createProjectFn(data)

      toast.success('Projeto criado com sucesso!')
    } catch {
      toast.error('Erro ao criar projeto, tente novamente!')
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

      <ProjectForm onSubmit={handleCreateProject} />
    </DialogContent>
  )
}
