import { FilePenLine, Trash } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProjectDTO } from '@/api/dtos/project-dto'

import { Button } from '../ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Dialog, DialogTrigger } from '../ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { DeleteProject } from './delete-project'
import { EditProject } from './edit-project'

interface ProjectItemProps {
  project: ProjectDTO
}

enum DialogType {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export function ProjectItem({ project }: ProjectItemProps) {
  const navigate = useNavigate()

  const [dialogType, setDialogType] = useState<DialogType | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button
          variant="link"
          size="sm"
          onClick={() => {
            navigate(`/boards/${project.id}`)
          }}
        >
          Ver tarefas
        </Button>
        <div className="flex items-center">
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => setDialogType(DialogType.UPDATE)}
                      >
                        <FilePenLine className="h-3 w-3 shrink-0" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </DialogTrigger>

            <DialogTrigger asChild>
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => setDialogType(DialogType.UPDATE)}
                      >
                        <Trash className="h-3 w-3 shrink-0" />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>Excluir</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </DialogTrigger>

            {dialogType === DialogType.UPDATE && (
              <EditProject project={project} />
            )}

            {dialogType === DialogType.DELETE && (
              <DeleteProject project={project} />
            )}
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  )
}
