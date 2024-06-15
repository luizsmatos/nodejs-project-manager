import { Request, Response } from 'express'
import { makeGetUserByIdUseCase } from '@/domain/use-cases/factories/make-get-user-by-id-usecase'
import { UserPresenter } from './presenters/user-presenter'

export async function getGetUserByIdController(
  request: Request,
  response: Response,
): Promise<Response> {
  const getUserByIdUseCase = makeGetUserByIdUseCase()
  const result = await getUserByIdUseCase.execute({
    userId: request.user.id,
  })

  const { user } = result

  return response.status(200).json({ user: UserPresenter.toHTTP(user) })
}
