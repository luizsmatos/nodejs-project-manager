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
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs" className="mr-1">
              <FilePenLine className="h-3 w-3" />
              <span className="sr-only">Editar tarefa</span>
            </Button>
          </DialogTrigger>

          <EditTask />
        </Dialog>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="xs" className="mr-1">
                <FileX2 className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Excluir tarefa</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  )
}
