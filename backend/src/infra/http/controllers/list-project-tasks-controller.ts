import { Request, Response } from 'express'
import { z } from 'zod'
import { makeListProjectTasksUseCase } from '@/domain/use-cases/factories/make-list-project-tasks-usecase'
import { TaskStatus } from '@/domain/entities/task'

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
