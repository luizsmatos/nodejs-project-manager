import { Router } from 'express'

import { authenticateUserController } from '../controllers/authenticate-user-controller'
import { registerUserController } from '../controllers/register-user-controller'

const usersRouter = Router()

usersRouter.post('/auth/register', registerUserController)
usersRouter.post('/auth/login', authenticateUserController)

export { usersRouter }
