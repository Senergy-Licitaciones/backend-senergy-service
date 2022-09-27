import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc'
const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.3',
  info: {
    title: 'Senergy - Licitaciones',
    version: '1.0.0',
    description: 'API para la Gestión de Licitaciones de Suministros de Energía Eléctrica'
  },
  servers: [{
    url: 'https://senergy-backend.herokuapp.com/api'
  }, {
    url: 'http://localhost:4000/api'
  }],
  externalDocs: {
    url: 'https://senergy-frontend.vercel.app/',
    description: 'Plataforma de Cliente'
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    schemas: {
      admin: {
        type: 'object',
        required: ['name', 'correo', 'password', 'role'],
        properties: {
          name: {
            type: 'string',
            correo: 'string',
            password: 'string',
            role: 'jefe | empleado'
          }
        }
      },
      responseMessage: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      }
    }
  }

}
const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['../apiServices/admin/route.ts']
}
export default swaggerJSDoc(swaggerOptions)
