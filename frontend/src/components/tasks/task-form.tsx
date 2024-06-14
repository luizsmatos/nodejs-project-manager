import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { EnumTaskStatus } from '@/api/dtos/task-dto'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'

const taskFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  description: z.string().min(3).max(191),
  status: z.nativeEnum(EnumTaskStatus),
})

export type TaskFormSchema = z.infer<typeof taskFormSchema>

interface TaskFormProps {
  initialValues?: TaskFormSchema
  onSubmit: (data: TaskFormSchema) => void
}

export function TaskForm({ initialValues, onSubmit }: TaskFormProps) {
  const form = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      status: EnumTaskStatus.PENDING,
      ...initialValues,
    },
  })

  const { isSubmitting, errors } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Título</FormLabel>
              <FormControl className="col-span-3">
                <Input {...field} />
              </FormControl>
              <FormMessage>
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
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

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
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
                    <SelectItem value={EnumTaskStatus.DONE}>Feito</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {errors.status && (
                  <p className="text-red-500">{errors.status.message}</p>
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
