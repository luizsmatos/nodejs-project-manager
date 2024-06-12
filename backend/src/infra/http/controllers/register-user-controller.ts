import { Request, Response } from 'express'
import { z } from 'zod'
import { makeRegisterUserUseCase } from '@/domain/use-cases/factories/make-register-user-usecase'
import { UserPresenter } from './presenters/user-presenter'

export async function registerUserController(
  request: Request,
  response: Response,
): Promise<Response> {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUserUseCase = makeRegisterUserUseCase()
  const result = await registerUserUseCase.execute({
    name,
    email,
    password,
  })

  const { user } = result

  return response.status(201).json({
    user: UserPresenter.toHTTP(user),
  })
}
