import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
import { SideBar } from '@/components/sidebar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1">
        <SideBar />

        <div className="flex-1 gap-4 p-8 pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
