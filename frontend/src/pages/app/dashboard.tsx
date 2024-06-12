import { Helmet } from 'react-helmet-async'

import { Tasks } from '@/components/tasks/tasks'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <Tasks />
    </>
  )
}
