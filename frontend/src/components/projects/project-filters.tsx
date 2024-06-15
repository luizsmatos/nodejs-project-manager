import { zodResolver } from '@hookform/resolvers/zod'
import { Filter, Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '../ui/sheet'

const projectFiltersSchema = z.object({
  name: z.string().optional(),
})

type ProjectFiltersSchema = z.infer<typeof projectFiltersSchema>

export function ProjectFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const name = searchParams.get('name')

  const form = useForm<ProjectFiltersSchema>({
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

    form.reset({
      name: '',
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="xs">
          <Filter className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="xs:w-full flex flex-col gap-4 p-4 dark:bg-gray-800 sm:w-80 md:w-80 lg:w-96 lg:gap-6 lg:p-6 xl:w-96"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFilters)}
            className="flex flex-col items-center gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl className="col-span-3">
                    <Input
                      {...field}
                      placeholder="Digite o nome do projeto"
                      className="border-none bg-gray-200 text-sm focus:ring-0 dark:bg-gray-700"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <SheetFooter className="w-full">
              <div className="mt-6 flex w-full flex-col items-center gap-2">
                <SheetClose asChild>
                  <Button
                    type="submit"
                    variant="secondary"
                    size="xs"
                    className="w-full"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Filtrar resultados
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={handleClearFilters}
                    className="w-full"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Remover filtros
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
