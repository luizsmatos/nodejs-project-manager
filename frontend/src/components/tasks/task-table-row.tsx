import { ClipboardIcon, FilePenLine, FileX2 } from 'lucide-react'

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

export function TaskTableRow() {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <ClipboardIcon className="h-4 w-4 shrink-0" />
          <div>Nova tarefa</div>
        </div>
      </TableCell>
      <TableCell className="font-medium">Luiz Gustavo</TableCell>
      <TableCell className="text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">12/09/2021</TableCell>
      <TableCell className="flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="xs" className="mr-1">
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

          <EditTask />
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="xs" className="mr-1">
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

          <DeleteTask />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
