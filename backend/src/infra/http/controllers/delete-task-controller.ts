import { Request, Response } from 'express'
import { z } from 'zod'
import { makeDeleteTaskUseCase } from '@/domain/use-cases/factories/make-delete-task-usecase'

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
