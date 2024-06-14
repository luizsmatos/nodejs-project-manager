import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'

import { Tasks } from '@/components/tasks/tasks'
import { ProjectContext } from '@/context/project-context'

export function Home() {
  const { selectedProject } = useContext(ProjectContext)

  return (
    <>
      <Helmet title={selectedProject?.name || 'Home'} />
      {selectedProject ? (
        <Tasks project={selectedProject} />
      ) : (
        <>
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-muted-foreground">
              Selecione um projeto para começar
            </p>
          </div>
        </>
      )}
    </>
  )
}
