import { Request, Response } from 'express'
import { z } from 'zod'
import { makeDeleteProjectUseCase } from '@/domain/use-cases/factories/make-delete-project-usecase'

export async function deleteProjectController(
  request: Request,
  response: Response,
): Promise<Response> {
  const deleteProjectParamsSchema = z.object({
    projectId: z.string().uuid(),
  })

  const { projectId } = deleteProjectParamsSchema.parse(request.params)

  const deleteProjectUseCase = makeDeleteProjectUseCase()
  await deleteProjectUseCase.execute({
    userId: request.user.id,
    projectId,
  })

  return response.status(204).send()
}
