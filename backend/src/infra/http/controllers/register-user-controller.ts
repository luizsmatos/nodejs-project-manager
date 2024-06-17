import { Request, Response } from 'express'
import { z } from 'zod'
import { makeRegisterUserUseCase } from '@/domain/use-cases/factories/make-register-user-usecase'

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAlreadyExistsError'
 */

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
  await registerUserUseCase.execute({
    name,
    email,
    password,
  })

  return response.status(201).send()
}
