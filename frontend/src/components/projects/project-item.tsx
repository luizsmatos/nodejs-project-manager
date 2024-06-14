import { FilePenIcon, MoveHorizontalIcon, Table, TrashIcon } from 'lucide-react'
import { useContext, useState } from 'react'

import { ProjectDTO } from '@/api/dtos/project-dto'
import { ProjectContext } from '@/context/project-context'

import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { DeleteProject } from './delete-project'
import { EditProject } from './edit-project'

interface ProjectItemsProps {
  project: ProjectDTO
}

enum DialogType {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export function ProjectItem({ project }: ProjectItemsProps) {
  const { selectedProject, setSelectedProject } = useContext(ProjectContext)
  const [dialogType, setDialogType] = useState<DialogType | null>(null)

  return (
    <div className="flex items-center justify-between p-0.5">
      <Button
        variant="ghost"
        className={`w-full justify-start text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 ${
          selectedProject?.id === project.id
            ? 'bg-gray-200 dark:bg-gray-700'
            : ''
        }`}
        onClick={() => setSelectedProject(project)}
      >
        <Table className="mr-2 h-4 w-4" />
        {project.name}
      </Button>

      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <MoveHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DialogTrigger
              asChild
              onClick={() => setDialogType(DialogType.UPDATE)}
            >
              <DropdownMenuItem>
                <FilePenIcon className="mr-2 h-4 w-4" />
                Editar Projeto
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger
              asChild
              onClick={() => setDialogType(DialogType.DELETE)}
            >
              <DropdownMenuItem>
                <TrashIcon className="mr-2 h-4 w-4" />
                Excluir Projeto
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        {dialogType === DialogType.UPDATE && <EditProject project={project} />}

        {dialogType === DialogType.DELETE && (
          <DeleteProject project={project} />
        )}
      </Dialog>
    </div>
  )
}
