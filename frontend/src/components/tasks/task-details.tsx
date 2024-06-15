import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { TaskDTO } from '@/api/dtos/task-dto'
import { getUserById } from '@/api/get-user-by-id'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { TaskStatus } from './task-status'

interface TaskDetailsProps {
  task: TaskDTO
}

export function TaskDetails({ task }: TaskDetailsProps) {
  function CompletedBy({ completedBy }: { completedBy: string | null }) {
    const { data: user } = useQuery({
      queryKey: [completedBy],
      queryFn: completedBy
        ? () => getUserById({ userId: completedBy })
        : undefined,
    })

    if (!user) {
      return <div className="font-medium">-</div>
    }

    return <div className="font-medium">{user.name}</div>
  }

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>{task.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <TaskStatus status={task.status} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Responsável
                </TableCell>
                <TableCell className="flex justify-end">
                  <CompletedBy completedBy={task.completedBy} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Data de criação
                </TableCell>
                <TableCell className="flex justify-end">
                  {format(task.createdAt, 'PP', { locale: ptBR })}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Concluída em
                </TableCell>
                <TableCell className="flex justify-end">
                  {task.completedAt
                    ? format(task.completedAt, 'PP', { locale: ptBR })
                    : '-'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </>
  )
}
