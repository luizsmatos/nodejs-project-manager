import { Request, Response } from 'express'
import { z } from 'zod'
import { makeDeleteProjectUseCase } from '@/domain/use-cases/factories/make-delete-project-usecase'

/**
 * @swagger
 * /api/projects/{projectId}:
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Projects
 *     summary: Delete project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: No content
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

export async function deleteProjectController(
  request: Request,
  response: Response,
): Promise<Response> {
  const deleteProjectParamsSchema = z.object({
    projectId: z.string().uuid(),
  })

  const { projectId } = deleteProjectParamsSchema.parse(request.params)

  const deleteProjectUseCase = makeDeleteProjectUseCase()
  await deleteProjectUseCase.execute({
    userId: request.user.id,
    projectId,
  })

  return response.status(204).send()
}
