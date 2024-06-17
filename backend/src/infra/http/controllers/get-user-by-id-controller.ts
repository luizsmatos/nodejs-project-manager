import { Request, Response } from 'express'
import { makeGetUserByIdUseCase } from '@/domain/use-cases/factories/make-get-user-by-id-usecase'
import { UserPresenter } from './presenters/user-presenter'
import z from 'zod'

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Users
 *     summary: Get user by id
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */

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
