import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useContext, useEffect } from 'react'

import { listUserProjects } from '@/api/list-user-projects'
import { ProjectContext } from '@/context/project-context'
import { useProjectQuery } from '@/hooks/use-project-query'

import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { Skeleton } from '../ui/skeleton'
import { CreateProject } from './create-project'
import { ProjectFilters } from './project-filters'
import { ProjectItem } from './project-item'

export function Projects() {
  const { name } = useProjectQuery()
  const { setSelectedProject } = useContext(ProjectContext)

  const { data: result, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects', name],
    queryFn: () => listUserProjects({ name }),
    staleTime: Infinity,
  })

  useEffect(() => {
    if (result && result.projects.length > 0) {
      setSelectedProject(result.projects[0])
    }
  }, [result, setSelectedProject])

  return (
    <div className="flex flex-col gap-6 lg:w-[320px]">
      <Dialog>
        <div className="flex items-center gap-2">
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <PlusIcon className="mr-2 h-4 w-4" />
              Novo Projeto
            </Button>
          </DialogTrigger>

          <ProjectFilters />
        </div>

        <CreateProject />
      </Dialog>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {isLoadingProjects ? (
            <div className="space-y-3">
              <Skeleton className="h-9 w-full px-4 py-2" />
              <Skeleton className="h-9 w-full px-4 py-2" />
              <Skeleton className="h-9 w-full px-4 py-2" />
            </div>
          ) : (
            result &&
            result.projects.map((project) => (
              <li key={project.id}>
                <ProjectItem project={project} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
