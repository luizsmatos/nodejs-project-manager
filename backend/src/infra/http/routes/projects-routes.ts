import { Router } from 'express'

import { createProjectController } from '../controllers/create-project-controller'
import { editProjectController } from '../controllers/edit-project-controller'
import { deleteProjectController } from '../controllers/delete-project-controller'
import { listUserProjectsController } from '../controllers/list-user-projects-controller'
import { verifyJwt } from '../middlewares/verify-jwt'

const projectsRouter = Router()

projectsRouter.use(verifyJwt)

projectsRouter.get('/projects', listUserProjectsController)
projectsRouter.post('/projects', createProjectController)
projectsRouter.put('/projects/:projectId', editProjectController)
projectsRouter.delete('/projects/:projectId', deleteProjectController)

export { projectsRouter }
