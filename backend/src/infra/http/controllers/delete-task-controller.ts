import { Request, Response } from 'express'
import { z } from 'zod'
import { makeDeleteTaskUseCase } from '@/domain/use-cases/factories/make-delete-task-usecase'

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Tasks
 *     summary: Delete task
 *     parameters:
 *       - in: path
 *         name: taskId
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
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskNotFound'
 */

export async function deleteTaskController(
  request: Request,
  response: Response,
): Promise<Response> {
  const deleteTaskParamsSchema = z.object({
    taskId: z.string().uuid(),
  })

  const { taskId } = deleteTaskParamsSchema.parse(request.params)

  const deleteTaskUseCase = makeDeleteTaskUseCase()
  await deleteTaskUseCase.execute({
    taskId,
  })

  return response.status(204).send()
}
