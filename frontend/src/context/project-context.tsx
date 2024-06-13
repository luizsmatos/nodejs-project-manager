import { createContext, useState } from 'react'

import { ProjectDTO } from '@/api/dtos/project-dto'

export interface ProjectContextType {
  selectedProject: ProjectDTO | null
  setSelectedProject: (project: ProjectDTO) => void
}

export const ProjectContext = createContext<ProjectContextType>(
  {} as ProjectContextType,
)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<ProjectDTO | null>(
    null,
  )

  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </ProjectContext.Provider>
  )
}
