import { randomUUID } from 'node:crypto'

import { HashGenerator } from '@/infra/cryptography/hash-generator'

import { User } from '../entities/user'
import { UsersRepository } from '../repositories/users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError(email)
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user: User = {
      id: randomUUID(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    }

    await this.usersRepository.create(user)

    return {
      user,
    }
  }
}
