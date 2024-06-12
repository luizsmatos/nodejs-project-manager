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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'

const editProductSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3).max(191),
  status: z.string(),
  completedBy: z.string(),
})

type EditTaskSchema = z.infer<typeof editProductSchema>

export function EditTask() {
  const { register, handleSubmit } = useForm<EditTaskSchema>({
    resolver: zodResolver(editProductSchema),
  })

  function handleEditTask(data: EditTaskSchema) {
    console.log(data)
  }

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
          <DialogDescription>Edite os detalhes da tarefa</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleEditTask)} className="space-y-6">
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger
                id="status"
                className="col-span-3"
                {...register('status')}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="completed">Feito</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="completedBy">Pessoa</Label>
            <Input
              className="col-span-3"
              id="completedBy"
              {...register('completedBy')}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  )
}
