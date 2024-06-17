import { Request, Response } from 'express'
import { z } from 'zod'
import { makeListUserProjectsUseCase } from '@/domain/use-cases/factories/make-list-user-projects-usecase'

/**
 * @swagger
 * /api/projects:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Projects
 *     summary: List user projects
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     nextPage:
 *                       type: integer
 */

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
