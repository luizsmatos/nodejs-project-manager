import { Request, Response } from 'express'
import { z } from 'zod'
import { makeListUserProjectsUseCase } from '@/domain/use-cases/factories/make-list-user-projects-usecase'

export async function listUserProjectsController(
  request: Request,
  response: Response,
): Promise<Response> {
  const listUserProjectsQuerySchema = z.object({
    name: z.string().optional(),
    page: z.coerce.number().positive().int().optional().default(1),
  })

  const { name, page } = listUserProjectsQuerySchema.parse(request.query)

  const listUserProjectsUseCase = makeListUserProjectsUseCase()
  const result = await listUserProjectsUseCase.execute({
    userId: request.user.id,
    name,
    page,
  })

  const { projects, meta } = result

  return response.status(200).json({ projects, meta })
}
