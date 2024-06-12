import { User } from '@/domain/entities/user'
import { UsersRepository } from '@/domain/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(userId: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === userId)

    return user ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    return user ?? null
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }
}
