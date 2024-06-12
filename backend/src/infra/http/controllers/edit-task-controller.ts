import { Request, Response } from 'express'
import { z } from 'zod'
import { makeEditTaskUseCase } from '@/domain/use-cases/factories/make-edit-task-usecase'
import { TaskStatus } from '@/domain/entities/task'

export async function editTaskController(
  request: Request,
  response: Response,
): Promise<Response> {
  const editTaskBodySchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(3).max(191).optional(),
    status: z.nativeEnum(TaskStatus).optional(),
    completedBy: z.string().uuid().optional(),
  })

  const { title, description, status, completedBy } = editTaskBodySchema.parse(
    request.body,
  )

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
    completedBy,
  })

  const { task } = result

  return response.status(200).json({ task })
}
