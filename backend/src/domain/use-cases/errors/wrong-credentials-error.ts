import { Unauthorized as UnauthorizedException } from 'http-errors'

export class WrongCredentialsError extends UnauthorizedException {
  constructor() {
    super('Credentials are invalid')
    this.name = 'WrongCredentialsError'
  }
}
