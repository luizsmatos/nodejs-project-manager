import { User } from '@/domain/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }
}
