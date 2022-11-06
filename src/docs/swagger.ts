import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc'
import path from 'path'
import { SchemasApp } from './schemas.group'
const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.3',
  info: {
    title: 'Senergy - Licitaciones',
    version: '1.0.0',
    description: 'API para la Gestión de Licitaciones de Suministros de Energía Eléctrica'
  },
  servers: [{
    url: 'https://senergy-backend.herokuapp.com'
  }, {
    url: 'http://localhost:4000'
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
    schemas: SchemasApp
  }

}
const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: [`${path.join(__dirname, '../apiServices/*/route.ts')}`]
}
export default swaggerJSDoc(swaggerOptions)
