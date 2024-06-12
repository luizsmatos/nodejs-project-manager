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
  name: z.string().min(3),
  description: z.string().min(3).max(191),
})

type CreateProjectSchema = z.infer<typeof createProductSchema>

export function CreateProject() {
  const { register, handleSubmit } = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProductSchema),
  })

  function handleCreateProject(data: CreateProjectSchema) {
    console.log(data)
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Novo Projeto</DialogTitle>
        <DialogDescription>
          Crie um novo projeto para organizar suas tarefas.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateProject)} className="space-y-6">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name">Nome</Label>
          <Input className="col-span-3" id="name" {...register('name')} />
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

          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
