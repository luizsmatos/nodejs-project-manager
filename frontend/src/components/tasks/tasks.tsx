import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { ProjectDTO } from '@/api/dtos/project-dto'
import { listProjectTasks } from '@/api/list-project-tasks'

import { Pagination } from '../pagination'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { CreateTask } from './create-task'
import { TaskFilters } from './task-filters'
import { TaskItem } from './task-item'

interface TasksProps {
  project: ProjectDTO
}

export function Tasks({ project }: TasksProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = z.coerce.number().parse(searchParams.get('page') ?? 1)

  const { data: result } = useQuery({
    queryKey: ['tasks', project.id, page],
    queryFn: () => listProjectTasks({ projectId: project.id, page }),
  })

  function handlePaginate(page: number) {
    setSearchParams((prev) => {
      prev.set('page', page.toString())

      return prev
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        <p className="text-lg text-muted-foreground">{project.description}</p>
      </div>

      <div className="space-y-2.5">
        <div className="flex justify-between">
          <TaskFilters />

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusIcon className="mr-2 h-4 w-4" />
                Criar Tarefa
              </Button>
            </DialogTrigger>

            <CreateTask project={project} />
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead>Elemento</TableHead>
                <TableHead className="w-[140px]">Pessoa</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead className="w-[140px]">Data</TableHead>
                <TableHead className="w-[180px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result &&
                result.tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
            </TableBody>
          </Table>
        </div>

        {result && (
          <Pagination
            page={result.meta.page}
            totalCount={result.meta.totalCount}
            perPage={result.meta.perPage}
            onPageChange={handlePaginate}
          />
        )}
      </div>
    </div>
  )
}
