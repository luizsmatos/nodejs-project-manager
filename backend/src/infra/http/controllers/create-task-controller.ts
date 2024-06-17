import { Request, Response } from 'express'
import { z } from 'zod'
import { makeCreateTaskUseCase } from '@/domain/use-cases/factories/make-create-task-usecase'
import { TaskStatus } from '@/domain/entities/task'

/**
 * @swagger
 * /api/projects/{projectId}/tasks:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Tasks
 *     summary: Create task
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [todo, doing, done]
 *     responses:
 *       201:
 *         description: Created
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
 */

export async function createTaskController(
  request: Request,
  response: Response,
): Promise<Response> {
  const createTaskParamsSchema = z.object({
    projectId: z.string().uuid(),
  })

  const { projectId } = createTaskParamsSchema.parse(request.params)

  const createTaskBodySchema = z.object({
    title: z.string().min(3),
    description: z.string().min(3).max(191),
    status: z.nativeEnum(TaskStatus),
  })

  const { title, description, status } = createTaskBodySchema.parse(
    request.body,
  )

  const createTaskUseCase = makeCreateTaskUseCase()
  const result = await createTaskUseCase.execute({
    projectId,
    title,
    description,
    status,
    userId: request.user.id,
  })

  const { task } = result

  return response.status(201).json({ task })
}
