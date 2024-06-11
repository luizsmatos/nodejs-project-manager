import { UsersRepository } from '@/domain/repositories/users-repository'
import { HashComparer } from '@/infra/cryptography/hash-comparer'

import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Encrypter } from '@/infra/cryptography/encrypter'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserUseCaseResponse {
  accessToken: string
}

export class AuthenticateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new WrongCredentialsError()
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new WrongCredentialsError()
    }

    const accessToken = await this.encrypter.encrypt({ sub: user.id })

    return {
      accessToken,
    }
  }
}
