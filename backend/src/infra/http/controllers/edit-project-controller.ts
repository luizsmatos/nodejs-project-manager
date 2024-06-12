import { Request, Response } from 'express'
import { z } from 'zod'
import { makeEditProjectUseCase } from '@/domain/use-cases/factories/make-edit-project-usecase'

export async function editProjectController(
  request: Request,
  response: Response,
): Promise<Response> {
  const editProjectBodySchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(3).max(191).optional(),
  })

  const { name, description } = editProjectBodySchema.parse(request.body)

  const editProjectParamsSchema = z.object({
    projectId: z.string().uuid(),
  })

  const { projectId } = editProjectParamsSchema.parse(request.params)

  const editProjectUseCase = makeEditProjectUseCase()
  const result = await editProjectUseCase.execute({
    userId: request.user.id,
    projectId,
    name,
    description,
  })

  const { project } = result

  return response.status(200).json({ project })
}
