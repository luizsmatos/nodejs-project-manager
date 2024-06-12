import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

export function DeleteTask() {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir uma tarefa</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir essa tarefa?
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6">
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit">Excluir</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  )
}
