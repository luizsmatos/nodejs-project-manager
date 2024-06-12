import { PlusIcon, Table } from 'lucide-react'

import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { CreateProject } from './create-project'
import { ProjectFilters } from './project-filters'

export function Projects() {
  return (
    <div className="flex flex-col gap-6">
      <ProjectFilters />

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <PlusIcon className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </DialogTrigger>

        <CreateProject />
      </Dialog>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <Button variant="ghost" className={`w-full justify-start`}>
                <Table className="mr-2 h-4 w-4" />
                Project {index + 1}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
