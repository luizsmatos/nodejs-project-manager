import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ClipboardIcon, FilePenLine, FileX2, Search } from 'lucide-react'
import { useState } from 'react'

import { TaskDTO } from '@/api/dtos/task-dto'

import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { TableCell, TableRow } from '../ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { DeleteTask } from './delete-task'
import { EditTask } from './edit-task'
import { TaskDetails } from './task-details'
import { TaskStatus } from './task-status'

interface TaskItemProps {
  task: TaskDTO
}

enum DialogType {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export function TaskItem({ task }: TaskItemProps) {
  const [dialogType, setDialogType] = useState<DialogType | null>(null)

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="xs">
                      <Search className="h-3 w-3 shrink-0" />
                      <span className="sr-only">Detalhes da tarefa</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Detalhes da tarefa</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </DialogTrigger>

          <TaskDetails task={task} />
        </Dialog>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <ClipboardIcon className="h-4 w-4 shrink-0" />
          <div>{task.title}</div>
        </div>
      </TableCell>

      <TableCell className="font-medium">{task.completedBy}</TableCell>

      <TableCell className="text-xs">
        <TaskStatus status={task.status} />
      </TableCell>

      <TableCell className="text-muted-foreground">
        {format(task.createdAt, 'PP', { locale: ptBR })}
      </TableCell>

      <TableCell>
        <Dialog>
          <div className="flex items-center gap-1">
            <DialogTrigger
              asChild
              onClick={() => setDialogType(DialogType.UPDATE)}
            >
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="xs">
                        <FilePenLine className="h-3 w-3" />
                        <span className="sr-only">Editar tarefa</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar tarefa</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </DialogTrigger>

            <DialogTrigger
              asChild
              onClick={() => setDialogType(DialogType.DELETE)}
            >
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="xs">
                        <FileX2 className="h-3 w-3" />
                        <span className="sr-only">Excluir tarefa</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Excluir tarefa</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </DialogTrigger>

            {dialogType === DialogType.UPDATE && <EditTask task={task} />}
            {dialogType === DialogType.DELETE && <DeleteTask task={task} />}
          </div>
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
