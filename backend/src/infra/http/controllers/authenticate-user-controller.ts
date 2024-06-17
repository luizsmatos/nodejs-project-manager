import { Request, Response } from 'express'
import { z } from 'zod'
import { makeAuthenticateUserUseCase } from '@/domain/use-cases/factories/make-authenticate-user-usecase'

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: OK
 *         headers:
 *           access_token:
 *             description: Access token
 *             schema:
 *               type: string
 *             example: access_token=eyJ; Path=/; HttpOnly; Secure; SameSite=None
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */

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
