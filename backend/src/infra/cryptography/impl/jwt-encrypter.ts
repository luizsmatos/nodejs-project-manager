import jwt from 'jsonwebtoken'
import { env } from '@/infra/config/env'
import { Encrypter } from '../encrypter'

export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: '1d',
    })
  }
}
