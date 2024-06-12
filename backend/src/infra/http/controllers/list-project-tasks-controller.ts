import { Request, Response } from 'express'
import { z } from 'zod'
import { makeListProjectTasksUseCase } from '@/domain/use-cases/factories/make-list-project-tasks-usecase'

export async function listProjectTasksController(
  request: Request,
  response: Response,
): Promise<Response> {
  const listProjectTasksParamsSchema = z.object({
    projectId: z.string().uuid(),
  })

  const { projectId } = listProjectTasksParamsSchema.parse(request.params)

  const listProjectTasksQuerySchema = z.object({
    page: z.coerce.number().positive().int().optional().default(1),
  })

  const { page } = listProjectTasksQuerySchema.parse(request.query)

  const listProjectTasksUseCase = makeListProjectTasksUseCase()
  const result = await listProjectTasksUseCase.execute({
    projectId,
    page,
  })

  const { tasks } = result

  return response.status(200).json({ tasks })
}
