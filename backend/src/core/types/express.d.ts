import { User } from '@/domain/entities/user'

export {}

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}
