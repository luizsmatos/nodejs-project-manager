import { EnumTaskStatus } from '@/api/dtos/task-dto'

interface TaskStatusProps {
  status: EnumTaskStatus
}

const taskStatusMap: Record<EnumTaskStatus, string> = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Em progresso',
  DONE: 'Feito',
}

export function TaskStatus({ status }: TaskStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'PENDING' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {status === 'IN_PROGRESS' && (
        <span className="h-2 w-2 rounded-full bg-yellow-500" />
      )}

      {status === 'DONE' && (
        <span className="h-2 w-2 rounded-full bg-green-500" />
      )}

      <span className="font-medium text-muted-foreground">
        {taskStatusMap[status]}
      </span>
    </div>
  )
}
