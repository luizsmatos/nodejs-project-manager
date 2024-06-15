/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  ClipboardIcon,
  Copy,
  FilePenLine,
  FileX2,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { EnumTaskStatus, TaskDTO } from '@/api/dtos/task-dto'
import { getUserById } from '@/api/get-user-by-id'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '../../ui/button'
import { Dialog, DialogTrigger } from '../../ui/dialog'
import { DeleteTask } from '../delete-task'
import { EditTask } from '../edit-task'
import { TaskDetails } from '../task-details'
import { TaskStatus } from '../task-status'

export const columns: ColumnDef<TaskDTO>[] = [
  {
    accessorKey: 'title',
    header: 'Título',
    cell: ({ row }) => {
      const title = row.getValue<string>('title')

      return (
        <div className="flex items-center gap-2">
          <ClipboardIcon className="h-4 w-4 shrink-0" />
          <div>{title}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => {
      const description = row.getValue<string>('description')
      const truncated =
        description.length > 25 ? `${description.slice(0, 25)}...` : description

      return <div className="text-muted-foreground">{truncated}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<EnumTaskStatus>('status')

      return <TaskStatus status={status} />
    },
  },
  {
    accessorKey: 'completedBy',
    header: 'Responsável',
    cell: ({ row }) => {
      const completedBy = row.getValue<string>('completedBy')

      if (completedBy) {
        const { data: user } = useQuery({
          queryKey: [completedBy],
          queryFn: () => getUserById({ userId: completedBy }),
        })

        if (user) {
          return <div className="font-medium">{user.name}</div>
        }
      }

      return <div className="font-medium">-</div>
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Data de criação',
    cell: ({ row }) => {
      const formatted = format(row.getValue('createdAt'), 'PP', {
        locale: ptBR,
      })

      return <div className="text-muted-foreground">{formatted}</div>
    },
  },
  {
    accessorKey: 'completedAt',
    header: 'Concluída em',
    cell: ({ row }) => {
      const formatted = row.getValue('completedAt')
        ? format(row.getValue('completedAt'), 'PP', {
            locale: ptBR,
          })
        : '-'

      return <div className="text-muted-foreground">{formatted}</div>
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const task = row.original

      enum DialogType {
        DETAILS = 'DETAILS',
        UPDATE = 'UPDATE',
        DELETE = 'DELETE',
      }

      const [dialogType, setDialogType] = useState<DialogType | null>(null)

      function handleDialogClose() {
        setDialogType(null)
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <Dialog>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(task.title)
                  toast.success('Título copiado para a área de transferência')
                }}
                className="flex gap-1"
              >
                <Copy className="h-3 w-3" />
                Copiar título
              </DropdownMenuItem>

              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="flex w-full gap-1"
                  onClick={() => setDialogType(DialogType.DETAILS)}
                >
                  <Search className="h-3 w-3" />
                  Detalhes
                </DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuSeparator />

              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="flex w-full gap-1"
                  onClick={() => setDialogType(DialogType.UPDATE)}
                >
                  <FilePenLine className="h-3 w-3" />
                  Editar tarefa
                </DropdownMenuItem>
              </DialogTrigger>

              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="flex w-full gap-1"
                  onClick={() => setDialogType(DialogType.DELETE)}
                >
                  <FileX2 className="h-3 w-3" />
                  Excluir tarefa
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>

            {dialogType === DialogType.DETAILS && <TaskDetails task={task} />}
            {dialogType === DialogType.UPDATE && (
              <EditTask task={task} onClose={handleDialogClose} />
            )}
            {dialogType === DialogType.DELETE && (
              <DeleteTask task={task} onClose={handleDialogClose} />
            )}
          </Dialog>
        </DropdownMenu>
      )
    },
  },
]
