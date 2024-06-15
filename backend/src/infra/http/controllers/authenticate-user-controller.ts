import { Request, Response } from 'express'
import { z } from 'zod'
import { makeAuthenticateUserUseCase } from '@/domain/use-cases/factories/make-authenticate-user-usecase'

export async function authenticateUserController(
  request: Request,
  response: Response,
): Promise<Response> {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateUserUseCase = makeAuthenticateUserUseCase()
  const result = await authenticateUserUseCase.execute({
    email,
    password,
  })

  const { accessToken } = result

  response.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })

  return response.send()
}
