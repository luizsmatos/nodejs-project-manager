import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'

import { ProjectDTO } from '@/api/dtos/project-dto'
import { listProjectTasks } from '@/api/list-project-tasks'

import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { CreateTask } from './create-task'
import { columns } from './table/columns'
import { DataTable } from './table/data-table'

interface TasksProps {
  project: ProjectDTO
}

export function Tasks({ project }: TasksProps) {
  const { data: result, isLoading } = useQuery({
    queryKey: ['tasks', project.id],
    queryFn: () => listProjectTasks({ projectId: project.id }),
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        <p className="text-lg text-muted-foreground">{project.description}</p>
      </div>

      <div className="flex flex-1 flex-col space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-fit">
              <PlusIcon className="mr-2 h-4 w-4" />
              Criar Tarefa
            </Button>
          </DialogTrigger>

          <CreateTask project={project} />
        </Dialog>

        <DataTable
          columns={columns}
          data={result?.tasks ?? []}
          isDataLoading={isLoading}
        />
      </div>
    </div>
  )
}
