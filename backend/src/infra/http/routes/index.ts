import { Router } from 'express'

import { projectsRouter } from './projects-routes'
import { tasksRouter } from './tasks-routes'
import { usersRouter } from './users-routes'

const routes = Router()

routes.use(usersRouter)
routes.use(projectsRouter)
routes.use(tasksRouter)

export { routes }
