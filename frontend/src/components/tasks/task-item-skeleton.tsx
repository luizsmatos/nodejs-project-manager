import { Search } from 'lucide-react'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { TableCell, TableRow } from '../ui/table'

export function TaskItemSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => {
    return (
      <TableRow key={index}>
        <TableCell>
          <Button disabled variant="outline" size="xs">
            <Search className="h-3 w-3 shrink-0" />
            <span className="sr-only">Detalhes da tarefa</span>
          </Button>
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 lg:w-[192px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 lg:w-[110px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 lg:w-[110px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 lg:w-[110px]" />
        </TableCell>

        <TableCell className="flex items-center gap-1">
          <Skeleton className="h-8 lg:w-[32px]" />
          <Skeleton className="h-8 lg:w-[32px]" />
        </TableCell>
      </TableRow>
    )
  })
}
