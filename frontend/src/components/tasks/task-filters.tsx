import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
  taskName: z.string().optional(),
  assignee: z.string().optional(),
  status: z.string().optional(),
})

type TaskFiltersSchema = z.infer<typeof taskFiltersSchema>

export function TaskFilters() {
  const { register, handleSubmit } = useForm<TaskFiltersSchema>({
    resolver: zodResolver(taskFiltersSchema),
  })

  function handleProductFilters(data: TaskFiltersSchema) {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleProductFilters)}
      className="grid grid-cols-5 items-center gap-2"
    >
      <Input
        type="text"
        placeholder="Nome da tarefa"
        className="border-none bg-gray-200 text-sm focus:ring-0 dark:bg-gray-700"
        {...register('taskName')}
      />

      <Input
        type="text"
        placeholder="Responsável"
        className="border-none bg-gray-200 text-sm focus:ring-0 dark:bg-gray-700"
        {...register('assignee')}
      />

      <Select defaultValue="all">
        <SelectTrigger
          className="border-none bg-gray-200 text-sm focus:ring-0 dark:bg-gray-700"
          {...register('status')}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="completed">Feito</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button variant="ghost" size="xs">
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
