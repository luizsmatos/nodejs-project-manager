import swaggerJsDoc from 'swagger-jsdoc'
// {
// 	"timestamp": "2024-06-17T00:47:24.774Z",
// 	"error": "ZodError",
// 	"message": {
// 		"name": "ZodValidationError",
// 		"details": [
// 			{
// 				"validation": "email",
// 				"code": "invalid_string",
// 				"message": "Validation error: Invalid email at \"email\"",
// 				"path": [
// 					"email"
// 				]
// 			}
// 		]
// 	}
// }

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
