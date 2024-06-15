import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import { EnumTaskStatus } from '@/api/dtos/task-dto'
import { Skeleton } from '@/components/ui/skeleton'

import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'

interface DataTable<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isDataLoading: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isDataLoading,
}: DataTable<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const tableData = useMemo(() => {
    if (isDataLoading) {
      return Array(10).fill({})
    }

    return data
  }, [data, isDataLoading])

  const tableColumns = useMemo(() => {
    if (isDataLoading) {
      return columns.map((column) => ({
        ...column,
        cell: () => <Skeleton className="h-6" />,
      }))
    }

    return columns
  }, [columns, isDataLoading])

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div className="flex flex-1 flex-col">
      <div className="grid w-full items-center gap-2 py-4 md:flex">
        <Input
          placeholder="Pesquisar por título"
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="w-full md:w-auto"
        />

        <div className="grid gap-3 md:flex lg:w-[180px]">
          <Select
            onValueChange={(value) => {
              if (value === 'all') {
                table.getColumn('status')?.setFilterValue(null)
                return
              }

              table.getColumn('status')?.setFilterValue(value as EnumTaskStatus)
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Status"
                className="text-muted-foreground"
              />
            </SelectTrigger>
            <SelectGroup>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value={EnumTaskStatus.PENDING}>Pendente</SelectItem>
                <SelectItem value={EnumTaskStatus.IN_PROGRESS}>
                  Em progresso
                </SelectItem>
                <SelectItem value={EnumTaskStatus.DONE}>Feito</SelectItem>
              </SelectContent>
            </SelectGroup>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Ops! sem tarefas...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Página anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima página
        </Button>
      </div>
    </div>
  )
}
