import { zodResolver } from '@hookform/resolvers/zod'
import { Filter, Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { EnumTaskStatus } from '@/api/dtos/task-dto'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '../ui/sheet'

const taskFiltersSchema = z.object({
  title: z.string().optional(),
  status: z.string().optional(),
})

type TaskFiltersSchema = z.infer<typeof taskFiltersSchema>

export function TaskFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const title = searchParams.get('title')
  const status = searchParams.get('status')

  const form = useForm<TaskFiltersSchema>({
    resolver: zodResolver(taskFiltersSchema),
    defaultValues: {
      title: title ?? '',
      status: status ?? 'all',
    },
  })

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

    form.reset({
      title: '',
      status: 'all',
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
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Buscar por título"
                      className="border-none bg-gray-200 text-sm focus:ring-0 dark:bg-gray-700"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="status" className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={EnumTaskStatus.PENDING}>
                          Pendente
                        </SelectItem>
                        <SelectItem value={EnumTaskStatus.IN_PROGRESS}>
                          Em progresso
                        </SelectItem>
                        <SelectItem value={EnumTaskStatus.DONE}>
                          Feito
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
