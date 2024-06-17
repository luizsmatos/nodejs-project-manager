import { Request, Response } from 'express'
import { z } from 'zod'
import { makeCreateProjectUseCase } from '@/domain/use-cases/factories/make-create-project-usecase'

/**
 * @swagger
 * /api/projects:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Projects
 *     summary: Create project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   type: object
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 */

export async function createProjectController(
  request: Request,
  response: Response,
): Promise<Response> {
  const createProjectBodySchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3).max(191),
  })

  const { name, description } = createProjectBodySchema.parse(request.body)

  const createProjectUseCase = makeCreateProjectUseCase()
  const result = await createProjectUseCase.execute({
    userId: request.user.id,
    name,
    description,
  })

  const { project } = result

  return response.status(201).json({ project })
}
