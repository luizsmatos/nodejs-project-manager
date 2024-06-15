import 'express-async-errors'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'

import { errorHandler } from './middlewares/error-handler'
import { routes } from './routes'
import { env } from '../config/env'

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
        return callback(null, true)
      }

      if (env.NODE_ENV === 'development') {
        return callback(null, true)
      }

      const allowedOrigins = ['https://project-manager-ui.onrender.com/']
      if (allowedOrigins.indexOf(origin) === -1) {
        const message =
          'The CORS policy for this site does not allow access from the specified Origin.'
        return callback(new Error(message))
      }

      return callback(new Error('Not allowed by CORS'))
    },
  }),
)
app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

app.use(errorHandler)

export { app }
