import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { EnumTaskStatus } from '@/api/dtos/task-dto'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const taskFiltersSchema = z.object({
  title: z.string().optional(),
  status: z.string().optional(),
})

type TaskFiltersSchema = z.infer<typeof taskFiltersSchema>

export function TaskFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const title = searchParams.get('title')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } = useForm<TaskFiltersSchema>(
    {
      resolver: zodResolver(taskFiltersSchema),
      defaultValues: {
        title: title ?? '',
        status: status ?? 'all',
      },
    },
  )

  function handleFilters({ title, status }: TaskFiltersSchema) {
    setSearchParams((prev) => {
      if (title) {
        prev.set('title', title)
      } else {
        prev.delete('title')
      }

      if (status) {
        prev.set('status', status)
      } else {
        prev.delete('status')
      }

      prev.set('page', '1')
      return prev
    })
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete('title')
      prev.delete('status')
      prev.set('page', '1')
      return prev
    })

    reset({
      title: '',
      status: 'all',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilters)}
      className="grid grid-cols-5 items-center gap-2"
    >
      <Input
        type="text"
        placeholder="Nome da tarefa"
        className="border-none bg-gray-200 text-sm focus:ring-0 dark:bg-gray-700"
        {...register('title')}
      />

      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <Select
            defaultValue="all"
            name={field.name}
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger className="border-none bg-gray-200 text-sm focus:ring-0 dark:bg-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value={EnumTaskStatus.PENDING}>Pendente</SelectItem>
              <SelectItem value={EnumTaskStatus.IN_PROGRESS}>
                Em progresso
              </SelectItem>
              <SelectItem value={EnumTaskStatus.DONE}>Feito</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        onClick={handleClearFilters}
        type="button"
        variant="ghost"
        size="xs"
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
