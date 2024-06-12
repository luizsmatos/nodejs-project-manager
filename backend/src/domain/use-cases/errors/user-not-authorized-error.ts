import { Forbidden as ForbiddenException } from 'http-errors'

export class UserNotAuthorizedError extends ForbiddenException {
  constructor() {
    super(`User not authorized`)
    this.name = 'UserNotAuthorizedError'
  }
}
