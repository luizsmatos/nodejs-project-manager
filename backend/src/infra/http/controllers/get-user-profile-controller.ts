import { Request, Response } from 'express'
import { makeGetUserProfileUseCase } from '@/domain/use-cases/factories/make-get-user-profile-usecase'
import { UserPresenter } from './presenters/user-presenter'

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Users
 *     summary: Get user profile
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFoundError'
 */

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
