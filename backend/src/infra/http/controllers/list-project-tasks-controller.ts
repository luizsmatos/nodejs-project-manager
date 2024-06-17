import { Request, Response } from 'express'
import { z } from 'zod'
import { makeListProjectTasksUseCase } from '@/domain/use-cases/factories/make-list-project-tasks-usecase'
import { TaskStatus } from '@/domain/entities/task'

/**
 * @swagger
 * /api/projects/{projectId}/tasks:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Tasks
 *     summary: List project tasks
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, DONE]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     perPage:
 *                       type: integer
 *                     totalCount:
 *                       type: integer
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

export async function listProjectTasksController(
  request: Request,
  response: Response,
): Promise<Response> {
  const listProjectTasksParamsSchema = z.object({
    projectId: z.string().uuid(),
  })

  const { projectId } = listProjectTasksParamsSchema.parse(request.params)

  const listProjectTasksQuerySchema = z.object({
    title: z.string().optional(),
    status: z.nativeEnum(TaskStatus).optional(),
    page: z.coerce.number().positive().int().optional().default(1),
  })

  const { title, status, page } = listProjectTasksQuerySchema.parse(
    request.query,
  )

  const listProjectTasksUseCase = makeListProjectTasksUseCase()
  const result = await listProjectTasksUseCase.execute({
    projectId,
    title,
    status,
    page,
  })

  const { tasks, meta } = result

  return response.status(200).json({ tasks, meta })
}
