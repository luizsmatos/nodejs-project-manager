import { Router } from 'express'

import { createTaskController } from '../controllers/create-task-controller'
import { editTaskController } from '../controllers/edit-task-controller'
import { deleteTaskController } from '../controllers/delete-task-controller'
import { listProjectTasksController } from '../controllers/list-project-tasks-controller'
import { verifyJwt } from '../middlewares/verify-jwt'

const tasksRouter = Router()

tasksRouter.use(verifyJwt)

tasksRouter.get('/projects/:projectId/tasks', listProjectTasksController)
tasksRouter.post('/projects/:projectId/tasks', createTaskController)
tasksRouter.put('/tasks/:taskId', editTaskController)
tasksRouter.delete('/tasks/:taskId', deleteTaskController)

export { tasksRouter }
