import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../ui/button'
import { DialogClose, DialogFooter } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name">Nome</Label>
        <Input className="col-span-3" id="name" {...register('name')} />
        {errors.name && (
          <p className="col-span-4 text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          className="col-span-3 resize-none"
          {...register('description')}
        />
        {errors.description && (
          <p className="col-span-4 text-red-500">
            {errors.description.message}
          </p>
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
