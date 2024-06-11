import { NotFound as NotFoundException } from 'http-errors'

export class TaskNotFoundError extends NotFoundException {
  constructor() {
    super(`Task not found`)
    this.name = 'TaskNotFoundError'
  }
}
