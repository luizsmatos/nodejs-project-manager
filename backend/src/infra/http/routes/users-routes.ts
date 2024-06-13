import { Router } from 'express'

import { authenticateUserController } from '../controllers/authenticate-user-controller'
import { registerUserController } from '../controllers/register-user-controller'
import { getUserProfileController } from '../controllers/get-user-profile-controller'
import { verifyJwt } from '../middlewares/verify-jwt'

const usersRouter = Router()

usersRouter.post('/auth/register', registerUserController)
usersRouter.post('/auth/login', authenticateUserController)
usersRouter.post('/auth/logout', (_request, response) => {
  response.clearCookie('access_token')

  return response.send()
})
usersRouter.get('/users/me', verifyJwt, getUserProfileController)

export { usersRouter }
