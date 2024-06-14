import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { EnumTaskStatus } from '@/api/dtos/task-dto'

import { Button } from '../ui/button'
import { DialogClose, DialogFooter } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title">Título</Label>
        <Input className="col-span-3" id="title" {...register('title')} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          className="col-span-3 resize-none"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status">Status</Label>
        <Select defaultValue={initialValues?.status}>
          <SelectTrigger id="status" className="col-span-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={EnumTaskStatus.PENDING}>Pendente</SelectItem>
            <SelectItem value={EnumTaskStatus.IN_PROGRESS}>
              Em progresso
            </SelectItem>
            <SelectItem value={EnumTaskStatus.DONE}>Feito</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-red-500">{errors.status.message}</p>
        )}
      </div>

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
  )
}
