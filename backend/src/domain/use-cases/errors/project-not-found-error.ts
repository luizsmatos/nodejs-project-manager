import { NotFound as NotFoundException } from 'http-errors'

export class ProjectNotFoundError extends NotFoundException {
  constructor() {
    super(`Project not found`)
    this.name = 'ProjectNotFoundError'
  }
}
