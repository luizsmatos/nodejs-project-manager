import 'express-async-errors'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'

import { errorHandler } from './middlewares/error-handler'
import { routes } from './routes'
import { useSwagger } from './middlewares/use-swagger'

const app = express()

app.use(helmet())

app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    allowedHeaders: ['Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, false)
      }

      return callback(null, true)
    },
  }),
)
app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

useSwagger(app)
app.all('/', (_request, response) => {
  response.redirect('/api/docs')
})

app.use('/api', routes)

app.use(errorHandler)

export { app }
