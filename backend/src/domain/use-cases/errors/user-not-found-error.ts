import { NotFound as NotFoundException } from 'http-errors'

export class UserNotFoundError extends NotFoundException {
  constructor() {
    super(`User not found`)
    this.name = 'UserNotFoundError'
  }
}
