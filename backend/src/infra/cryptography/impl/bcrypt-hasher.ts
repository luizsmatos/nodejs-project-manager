import bcrypt from 'bcrypt'

import { HashComparer } from '../hash-comparer'
import { HashGenerator } from '../hash-generator'

export class BcryptHasher implements HashGenerator, HashComparer {
  private readonly SALT = 6

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.SALT)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }
}
