import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const createProductSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3).max(191),
})

type CreateTaskSchema = z.infer<typeof createProductSchema>

export function CreateTask() {
  const { register, handleSubmit } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createProductSchema),
  })

  function handleCreateTask(data: CreateTaskSchema) {
    console.log(data)
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Nova Tarefa</DialogTitle>
        <DialogDescription>Preencha os campos abaixo.</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateTask)} className="space-y-6">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title">Título</Label>
          <Input className="col-span-3" id="title" {...register('title')} />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            className="col-span-3 resize-none"
            {...register('description')}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit">Criar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
