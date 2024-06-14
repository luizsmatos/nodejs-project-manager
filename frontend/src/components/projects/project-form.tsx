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
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
  description: z
    .string()
    .min(3, { message: 'A descrição deve ter no mínimo 3 caracteres' })
    .max(191, { message: 'A descrição deve ter no máximo 191 caracteres' }),
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
            <FormItem>
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
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl className="col-span-3">
                <Textarea {...field} className="resize-none" />
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
