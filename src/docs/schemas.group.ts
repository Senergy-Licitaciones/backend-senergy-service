import swaggerJSDoc from 'swagger-jsdoc'
import { AdminSchema, ParametroNameSchema, ResponseAdminSchema, ResponseCalculoSchema, ResponseMessageSchema } from './schemas'

export const SchemasApp: {
  [key: string]: swaggerJSDoc.Reference | swaggerJSDoc.Schema
} | undefined = {
  admin: AdminSchema,
  responseAdmin: ResponseAdminSchema,
  responseMessage: ResponseMessageSchema,
  responseCalculo: ResponseCalculoSchema,
  parametroName: ParametroNameSchema
}
