import { NextFunction, Request, Response } from 'express'
import { Unauthorized } from 'http-errors'
import jwt from 'jsonwebtoken'

import { env } from '@/infra/config/env'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export async function verifyJwt(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Unauthorized()
  }

  try {
    const [, token] = authHeader.split(' ')

    const decoded = jwt.verify(token, env.JWT_SECRET) as { sub: string }

    const usersRepository = new PrismaUsersRepository()
    const user = await usersRepository.findById(decoded.sub)

    if (!user) {
      throw new Unauthorized()
    }

    request.user = user

    next()
  } catch (err) {
    throw new Unauthorized()
  }
}
