import { Request, Response } from 'express'
import { makeGetUserProfileUseCase } from '@/domain/use-cases/factories/make-get-user-profile-usecase'
import { UserPresenter } from './presenters/user-presenter'

export async function getUserProfileController(
  request: Request,
  response: Response,
): Promise<Response> {
  const getUserProfileUseCase = makeGetUserProfileUseCase()
  const result = await getUserProfileUseCase.execute({
    userId: request.user.id,
  })

  const { user } = result

  return response.status(200).json({ user: UserPresenter.toHTTP(user) })
}
