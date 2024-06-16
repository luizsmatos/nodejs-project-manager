import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'

import { getUserProfile } from '@/api/get-user-profile'
import { listUserProjects } from '@/api/list-user-projects'
import { useProjectQuery } from '@/hooks/use-project-query'

import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { Skeleton } from '../ui/skeleton'
import { CreateProject } from './create-project'
import { ProjectFilters } from './project-filters'
import { ProjectItem } from './project-item'

export function ProjectList() {
  const { name } = useProjectQuery()

  const { data: result, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects', name],
    queryFn: () => listUserProjects({ name }),
    staleTime: Infinity,
  })

  const { data: profile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
    staleTime: Infinity,
    retry: false,
  })

  return (
    <div className="flex min-h-screen flex-col gap-6">
      <div className="flex flex-col leading-relaxed">
        <h1 className="text-xl font-bold md:text-2xl">
          Bem vindo, {profile?.name}!
          <span className="animate-wave_hand_animation animate-wave origin-70 mr-2 inline-block h-6 w-6 transform text-xl">
            👋
          </span>
        </h1>
        <span className="text-base text-muted-foreground">
          Área de trabalho principal
        </span>
      </div>

      <Dialog>
        <div className="flex w-fit items-center gap-2">
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {isLoadingProjects ? (
          <>
            {Array.from({ length: 20 }).map((_, index) => {
              return <Skeleton key={index} className="h-36 w-full px-4 py-2" />
            })}
          </>
        ) : (
          result &&
          result.projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  )
}
