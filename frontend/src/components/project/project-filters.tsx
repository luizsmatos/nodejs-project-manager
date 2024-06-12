import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

const projectFiltersSchema = z.object({
  search: z.string().optional(),
})

type ProjectFiltersSchema = z.infer<typeof projectFiltersSchema>

export function ProjectFilters() {
  const { register, handleSubmit } = useForm<ProjectFiltersSchema>({
    resolver: zodResolver(projectFiltersSchema),
  })

  function handleProductFilters(data: ProjectFiltersSchema) {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleProductFilters)}
      className="flex items-center gap-2"
    >
      <Input
        type="text"
        placeholder="Pesquisar"
        className="border-none bg-gray-200 text-sm focus:ring-0 dark:bg-gray-700"
        {...register('search')}
      />

      <Button type="submit" variant="ghost" size="icon">
        <SearchIcon className="h-5 w-5" />
      </Button>
    </form>
  )
}
