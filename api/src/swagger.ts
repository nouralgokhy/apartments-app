import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Apartments API',
      version: '1.0.0',
      description: 'API documentation for the Apartments application',
    },
  },

  apis: ['./dist/**/*.js'], 
});

