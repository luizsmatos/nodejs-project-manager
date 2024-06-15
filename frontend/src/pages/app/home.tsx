import { Helmet } from 'react-helmet-async'

import { ProjectList } from '@/components/projects/project-list'

export function Home() {
  return (
    <div className="flex-1">
      <Helmet title="Home" />
      <ProjectList />
    </div>
  )
}
