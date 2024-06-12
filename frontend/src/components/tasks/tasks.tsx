import { PlusIcon } from 'lucide-react'

import { Pagination } from '../pagination'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { CreateTask } from './create-task'
import { TaskFilters } from './task-filters'
import { TaskTableRow } from './task-table-row'

export function Tasks() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Titulo Projeto</h1>
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

            <CreateTask />
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[320px]">Elemento</TableHead>
                <TableHead className="w-[140px]">Pessoa</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead className="w-[140px]">Data</TableHead>
                <TableHead className="w-[180px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TaskTableRow key={index} />
              ))}
              <TaskTableRow />
            </TableBody>
          </Table>
        </div>

        <Pagination pageIndex={0} totalCount={105} perPage={10} />
      </div>
    </div>
  )
}
