import { useQuery } from '@tanstack/react-query'
import {
  FilePenIcon,
  MoveHorizontalIcon,
  PlusIcon,
  Table,
  TrashIcon,
} from 'lucide-react'
import { useState } from 'react'

import { listUserProjects } from '@/api/list-user-projects'

import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'
import { CreateProject } from './create-project'
import { DeleteProject } from './delete-project'
import { EditProject } from './edit-project'
import { ProjectFilters } from './project-filters'

enum DialogType {
  Edit = 'edit',
  Delete = 'delete',
}

export function Projects() {
  const [dialogType, setDialogType] = useState<DialogType | null>(null)

  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: listUserProjects,
    staleTime: Infinity,
  })

  return (
    <div className="flex flex-col gap-6">
      <ProjectFilters />

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <PlusIcon className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </DialogTrigger>

        <CreateProject />
      </Dialog>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {isLoadingProjects ? (
            <div className="space-y-3">
              <Skeleton className="h-9 w-full px-4 py-2" />
              <Skeleton className="h-9 w-full px-4 py-2" />
              <Skeleton className="h-9 w-full px-4 py-2" />
            </div>
          ) : (
            projects?.map((project) => (
              <li key={project.id}>
                <div className="flex items-center justify-between p-0.5">
                  <Button variant="ghost" className={`w-full justify-start`}>
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
                          onClick={() => setDialogType(DialogType.Edit)}
                        >
                          <DropdownMenuItem>
                            <FilePenIcon className="mr-2 h-4 w-4" />
                            Editar Projeto
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogTrigger
                          asChild
                          onClick={() => setDialogType(DialogType.Delete)}
                        >
                          <DropdownMenuItem>
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Excluir Projeto
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {dialogType === DialogType.Edit && (
                      <EditProject project={project} />
                    )}

                    {dialogType === DialogType.Delete && (
                      <DeleteProject project={project} />
                    )}
                  </Dialog>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
