import { useQuery } from '@tanstack/react-query'
import { Ellipsis } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import { getProjectById } from '@/api/get-project-by-id'
import { TaskList } from '@/components/tasks/task-list'

export function Tasks() {
  const { projectId } = useParams()

  const { data: project, isLoading } = useQuery({
    queryKey: [projectId],
    queryFn: () => getProjectById({ projectId: projectId as string }),
  })

  return (
    <>
      <Helmet title={project?.name || 'Home'} />

      {isLoading && (
        <div className="flex min-h-screen items-center justify-center">
          <Ellipsis className="h-20 w-20 animate-bounce" />
        </div>
      )}

      {project && <TaskList project={project} />}
    </>
  )
}
