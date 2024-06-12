import { Request, Response } from 'express'
import { z } from 'zod'
import { makeCreateTaskUseCase } from '@/domain/use-cases/factories/make-create-task-usecase'

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
  })

  const { title, description } = createTaskBodySchema.parse(request.body)

  const createTaskUseCase = makeCreateTaskUseCase()
  const result = await createTaskUseCase.execute({
    projectId,
    title,
    description,
  })

  const { task } = result

  return response.status(201).json({ task })
}
