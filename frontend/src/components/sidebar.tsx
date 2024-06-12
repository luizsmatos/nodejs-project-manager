import { PlusIcon } from 'lucide-react'

import { CreateProject } from './project/create-project'
import { ListProjects } from './project/list-projects'
import { ProjectFilters } from './project/project-filters'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'

export function SideBar() {
  return (
    <div className="flex flex-col gap-6 border-r border-gray-200 p-6 dark:border-gray-700">
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

      <ListProjects />
    </div>
  )
}
