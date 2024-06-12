import { Project } from '@/domain/entities/project'
import { User } from '@/domain/entities/user'

export {}

declare global {
  namespace Express {
    interface Request {
      user: User
      project: Project
    }
  }
}
