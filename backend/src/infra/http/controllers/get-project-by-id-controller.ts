import { Request, Response } from 'express'
import { makeGetProjectByIdUseCase } from '@/domain/use-cases/factories/make-get-project-by-id-usecase'
import z from 'zod'

/**
 * @swagger
 * /api/projects/{projectId}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Projects
 *     summary: Get project by id
 *     parameters:
 *       - in: path
 *         name: projectId
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
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectNotFound'
 */

export async function getGetProjectByIdController(
  request: Request,
  response: Response,
): Promise<Response> {
  const getProjectByIdParams = z.object({
    projectId: z.string().uuid(),
  })

  const { projectId } = getProjectByIdParams.parse(request.params)

  const getProjectByIdUseCase = makeGetProjectByIdUseCase()
  const result = await getProjectByIdUseCase.execute({
    projectId,
  })

  const { project } = result

  return response.status(200).json({ project })
}
