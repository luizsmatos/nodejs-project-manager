import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../ui/button'
import { DialogClose, DialogFooter } from '../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const projectFormSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3),
  description: z.string().min(3).max(191),
})

export type ProjectFormSchema = z.infer<typeof projectFormSchema>

interface ProjectFormProps {
  initialValues?: ProjectFormSchema
  onSubmit: (data: ProjectFormSchema) => void
}

export function ProjectForm({ initialValues, onSubmit }: ProjectFormProps) {
  const form = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: '',
      description: '',
      ...initialValues,
    },
  })

  const { isSubmitting, errors } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Nome</FormLabel>
              <FormControl className="col-span-3">
                <Input {...field} />
              </FormControl>
              <FormMessage>
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Descrição</FormLabel>
              <FormControl className="col-span-3">
                <Textarea {...field} />
              </FormControl>
              <FormMessage>
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isSubmitting}>
            {initialValues ? 'Salvar' : 'Criar'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
