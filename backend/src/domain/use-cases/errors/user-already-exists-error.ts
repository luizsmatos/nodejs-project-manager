import { Conflict as ConflictException } from 'http-errors'

export class UserAlreadyExistsError extends ConflictException {
  constructor(identifier: string) {
    super(`User "${identifier}" already exists`)
    this.name = 'UserAlreadyExistsError'
  }
}
