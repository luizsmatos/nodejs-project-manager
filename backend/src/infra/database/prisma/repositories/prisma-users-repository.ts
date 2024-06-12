import { User } from '@/domain/entities/user'
import { UsersRepository } from '@/domain/repositories/users-repository'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { prisma } from '../prisma'

export class PrismaUsersRepository implements UsersRepository {
  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await prisma.user.create({
      data,
    })
  }
}
