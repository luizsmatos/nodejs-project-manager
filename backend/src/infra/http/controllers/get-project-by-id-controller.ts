import { Request, Response } from 'express'
import { makeGetProjectByIdUseCase } from '@/domain/use-cases/factories/make-get-project-by-id-usecase'
import z from 'zod'

export async function getGetProjectByIdController(
  request: Request,
  response: Response,
): Promise<Response> {
  const getProjectByIdParams = z.object({
    projectId: z.string().uuid(),
  })

  const { projectId } = getProjectByIdParams.parse(request.params)

  const getProjectByIdUseCase = makeGetProjectByIdUseCase()
  const result = await getProjectByIdUseCase.execute({
    projectId,
  })

  const { project } = result

  return response.status(200).json({ project })
}
