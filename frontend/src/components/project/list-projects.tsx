import { Table } from 'lucide-react'

import { Button } from '../ui/button'

export function ListProjects() {
  return (
    <div className="flex-1 overflow-y-auto">
      <ul className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>
            <Button variant="ghost" className={`w-full justify-start`}>
              <Table className="mr-2 h-4 w-4" />
              Project {index + 1}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
