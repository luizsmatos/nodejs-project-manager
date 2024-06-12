import { ListTodo } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <ListTodo className="h-6 w-6" />

          <Separator orientation="vertical" className="h-6" />

          <h1 className="text-2xl font-bold">Project Manager</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </header>
    </div>
  )
}
