import { Request, Response } from 'express'
import { makeGetUserByIdUseCase } from '@/domain/use-cases/factories/make-get-user-by-id-usecase'
import { UserPresenter } from './presenters/user-presenter'
import z from 'zod'

export async function getGetUserByIdController(
  request: Request,
  response: Response,
): Promise<Response> {
  const getUserByIdParams = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = getUserByIdParams.parse(request.params)

  const getUserByIdUseCase = makeGetUserByIdUseCase()
  const result = await getUserByIdUseCase.execute({
    userId,
  })

  const { user } = result

  return response.status(200).json({ user: UserPresenter.toHTTP(user) })
}
