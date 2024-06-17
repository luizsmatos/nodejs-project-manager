import { Request, Response } from 'express'
import { z } from 'zod'
import { makeEditProjectUseCase } from '@/domain/use-cases/factories/make-edit-project-usecase'

/**
 * @swagger
 * /api/projects/{projectId}:
 *   put:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Projects
 *     summary: Edit project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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
 *       200:
 *         description: OK
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
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotAuthorizedError'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectNotFound'
 */

export async function editProjectController(
  request: Request,
  response: Response,
): Promise<Response> {
  const editProjectBodySchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(3).max(191).optional(),
  })

  const { name, description } = editProjectBodySchema.parse(request.body)

  const editProjectParamsSchema = z.object({
    projectId: z.string().uuid(),
  })

  const { projectId } = editProjectParamsSchema.parse(request.params)

  const editProjectUseCase = makeEditProjectUseCase()
  const result = await editProjectUseCase.execute({
    userId: request.user.id,
    projectId,
    name,
    description,
  })

  const { project } = result

  return response.status(200).json({ project })
}
