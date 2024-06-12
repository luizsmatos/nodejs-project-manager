import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import z, { ZodError } from 'zod'
import { errorMap, fromError } from 'zod-validation-error'

z.setErrorMap(errorMap)

type BodyResponse = { status: number; error: string; message: unknown }
type ErrorResponse = [boolean, BodyResponse?]

function checkHttpError(err: Error): ErrorResponse {
  if (err instanceof HttpError) {
    return [
      true,
      {
        status: err.statusCode,
        error: err.name,
        message: err.message,
      },
    ]
  }

  return [false]
}

function checkZodError(err: Error): ErrorResponse {
  if (err instanceof ZodError) {
    return [
      true,
      {
        status: 400,
        error: err.constructor.name,
        message: fromError(err),
      },
    ]
  }
  return [false]
}

export function errorHandler(
  err: Error,
  _request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  let treated: boolean = false
  let body: BodyResponse | undefined

  if (!treated) [treated, body] = checkHttpError(err)
  if (!treated) [treated, body] = checkZodError(err)

  if (treated && body) {
    return response.status(body.status).json({
      timestamp: new Date().toISOString(),
      error: body.error,
      message: body.message,
    })
  }

  return response.status(500).json({
    timestamp: new Date().toISOString(),
    error: err.constructor.name,
    message: err.message,
  })
}
