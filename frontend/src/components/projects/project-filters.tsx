import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

const projectFiltersSchema = z.object({
  name: z.string().optional(),
})

type ProjectFiltersSchema = z.infer<typeof projectFiltersSchema>

export function ProjectFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('name')

  const { register, handleSubmit, reset } = useForm<ProjectFiltersSchema>({
    resolver: zodResolver(projectFiltersSchema),
    defaultValues: {
      name: name ?? '',
    },
  })

  function handleFilters({ name }: ProjectFiltersSchema) {
    setSearchParams((prev) => {
      if (name) {
        prev.set('name', name)
      } else {
        prev.delete('name')
      }

      return prev
    })
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete('name')

      return prev
    })

    reset({
      name: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilters)}
      className="flex items-center gap-2"
    >
      <Input
        type="text"
        placeholder="Pesquisar"
        className="border-none bg-gray-200 text-sm focus:ring-0 dark:bg-gray-700"
        {...register('name')}
      />

      <Button type="submit" variant="ghost" size="xs">
        <Search className="h-5 w-5" />
      </Button>

      <Button
        onClick={handleClearFilters}
        type="button"
        variant="ghost"
        size="xs"
      >
        <X className="h-5 w-5" />
      </Button>
    </form>
  )
}
