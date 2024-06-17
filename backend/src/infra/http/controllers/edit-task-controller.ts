import { Request, Response } from 'express'
import { z } from 'zod'
import { makeEditTaskUseCase } from '@/domain/use-cases/factories/make-edit-task-usecase'
import { TaskStatus } from '@/domain/entities/task'

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   put:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Tasks
 *     summary: Edit task
 *     parameters:
 *       - in: path
 *         name: taskId
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, DONE]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: object
 *                   $ref: '#/components/schemas/Task'
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

export async function editTaskController(
  request: Request,
  response: Response,
): Promise<Response> {
  const editTaskBodySchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(3).max(191).optional(),
    status: z.nativeEnum(TaskStatus).optional(),
  })

  const { title, description, status } = editTaskBodySchema.parse(request.body)

  const editTaskParamsSchema = z.object({
    taskId: z.string().uuid(),
  })

  const { taskId } = editTaskParamsSchema.parse(request.params)

  const editTaskUseCase = makeEditTaskUseCase()
  const result = await editTaskUseCase.execute({
    taskId,
    title,
    description,
    status,
    userId: request.user.id,
  })

  const { task } = result

  return response.status(200).json({ task })
}
