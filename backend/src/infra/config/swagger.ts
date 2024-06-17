import swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Manager',
      version: '1.0.0',
      description: 'API Documentation',
    },
    tags: [
      {
        name: 'Users',
        description: 'User related endpoints',
      },
      {
        name: 'Projects',
        description: 'Project related endpoints',
      },
      {
        name: 'Tasks',
        description: 'Task related endpoints',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'access_token',
        },
      },
      security: {
        cookieAuth: [],
      },
      schemas: {
        ValidationError: {
          type: 'object',
          properties: {
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
            error: {
              type: 'string',
            },
            message: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                details: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      validation: {
                        type: 'string',
                      },
                      code: {
                        type: 'string',
                      },
                      message: {
                        type: 'string',
                      },
                      path: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        UnauthorizedError: {
          type: 'object',
          properties: {
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
            error: {
              type: 'string',
            },
            message: {
              type: 'string',
              example: 'Unauthorized',
            },
          },
        },
        UserAlreadyExistsError: {
          type: 'object',
          properties: {
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
            error: {
              type: 'string',
            },
            message: {
              type: 'string',
              example: 'User already exists',
            },
          },
        },
        WrongCredentialsError: {
          type: 'object',
          properties: {
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
            error: {
              type: 'string',
            },
            message: {
              type: 'string',
              example: 'Credentials are invalid',
            },
          },
        },
        UserNotFoundError: {
          type: 'object',
          properties: {
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
            error: {
              type: 'string',
            },
            message: {
              type: 'string',
              example: 'User not found',
            },
          },
        },
        UserNotAuthorizedError: {
          type: 'object',
          properties: {
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
            error: {
              type: 'string',
            },
            message: {
              type: 'string',
              example: 'User not authorized',
            },
          },
        },
        ProjectNotFound: {
          type: 'object',
          properties: {
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
            error: {
              type: 'string',
            },
            message: {
              type: 'string',
              example: 'Project not found',
            },
          },
        },
        TaskNotFound: {
          type: 'object',
          properties: {
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
            error: {
              type: 'string',
            },
            message: {
              type: 'string',
              example: 'Task not found',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
        Project: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            userId: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            projectId: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'IN_PROGRESS', 'DONE'],
            },
            completedBy: {
              type: 'string',
            },
            completedAt: {
              type: 'string',
              format: 'date-time',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
  },
  apis: ['src/infra/http/controllers/*-controller.ts'],
}

export const swaggerDocs = swaggerJsDoc(swaggerOptions)
