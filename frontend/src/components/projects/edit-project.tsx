import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ProjectDTO } from '@/api/dtos/project-dto'
import { editProject } from '@/api/edit-project'
import { ListUserProjectsResponse } from '@/api/list-user-projects'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { ProjectForm, ProjectFormSchema } from './project-form'

interface EditProjectProps {
  project: ProjectDTO
}

export function EditProject({ project }: EditProjectProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: editProjectFn } = useMutation({
    mutationFn: editProject,
    onSuccess(updatedProject) {
      const previousProjects =
        queryClient.getQueryData<ListUserProjectsResponse>(['projects'])

      if (previousProjects) {
        queryClient.setQueryData<ListUserProjectsResponse>(['projects'], {
          ...previousProjects,
          projects: previousProjects.projects.map((item) =>
            item.id === updatedProject.id ? updatedProject : item,
          ),
        })
      }
    },
  })

  async function handleEditProject(data: ProjectFormSchema) {
    try {
      await editProjectFn({
        id: project.id,
        name: data.name,
        description: data.description,
      })

      toast.success('Projeto editado com sucesso!')
    } catch {
      toast.error('Falha ao editar o projeto, tente novamente!')
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Editar Projeto</DialogTitle>
        <DialogDescription>Edite as informações do projeto.</DialogDescription>
      </DialogHeader>

      <ProjectForm initialValues={project} onSubmit={handleEditProject} />
    </DialogContent>
  )
}
