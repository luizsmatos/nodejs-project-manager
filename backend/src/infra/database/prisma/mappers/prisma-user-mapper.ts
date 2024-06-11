import { Prisma, User as PrismaUser } from '@prisma/client'
import { User } from '@/domain/entities/user'

export class PrismaUserMapper {
  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    }
  }

  static toDomain(raw: PrismaUser): User {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      createdAt: raw.createdAt,
    }
  }
}
