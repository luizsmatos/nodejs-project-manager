import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { errorHandler } from './middlewares/error-handler'
import { usersRouter } from './routes/users-routes'
import { projectsRouter } from './routes/projects-routes'

const app = express()

app.use(helmet())

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(usersRouter)
app.use(projectsRouter)

app.use(errorHandler)

export { app }
