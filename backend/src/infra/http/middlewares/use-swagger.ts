import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocs } from '@/infra/config/swagger'

export function useSwagger(app: Express): void {
  const options: swaggerUi.SwaggerUiOptions = {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  }

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options))
}
