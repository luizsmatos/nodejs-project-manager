import { Forbidden as ForbiddenException } from 'http-errors'

export class UserNotAuthorizedError extends ForbiddenException {
  constructor() {
    super(`User not authorized to perform this action`)
    this.name = 'UserNotAuthorizedError'
  }
}
