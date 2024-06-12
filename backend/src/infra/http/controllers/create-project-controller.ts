import { Request, Response } from 'express'
import { z } from 'zod'
import { makeCreateProjectUseCase } from '@/domain/use-cases/factories/make-create-project-usecase'

export async function createProjectController(
  request: Request,
  response: Response,
): Promise<Response> {
  const createProjectBodySchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3).max(191),
  })

  const { name, description } = createProjectBodySchema.parse(request.body)

  const createProjectUseCase = makeCreateProjectUseCase()
  const result = await createProjectUseCase.execute({
    userId: request.user.id,
    name,
    description,
  })

  const { project } = result

  return response.status(201).json({ project })
}
