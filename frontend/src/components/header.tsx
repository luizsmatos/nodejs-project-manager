import { Home, ListTodo } from 'lucide-react'
import { Link } from 'react-router-dom'

import { AccountMenu } from './account/account-menu'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <ListTodo className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Project Manager</h1>

          <Separator orientation="vertical" className="h-6" />

          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Link to="/boards" className="flex items-center justify-start gap-2">
              <Home className="h-4 w-4" />
              Início
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </header>
    </div>
  )
}
