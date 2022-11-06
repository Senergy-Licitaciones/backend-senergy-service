import swaggerJSDoc from 'swagger-jsdoc'
import { AdminSchema, ParametroNameSchema } from './schemas'
import { UpdateParametersByDateSchemaRequest } from './schemas/requests'
import { ResponseAdminSchema, ResponseCalculoSchema, ResponseMessageSchema } from './schemas/responses'

export const SchemasApp: {
  [key: string]: swaggerJSDoc.Reference | swaggerJSDoc.Schema
} | undefined = {
  admin: AdminSchema,
  responseAdmin: ResponseAdminSchema,
  responseMessage: ResponseMessageSchema,
  responseCalculo: ResponseCalculoSchema,
  parametroName: ParametroNameSchema,
  updateParametersByDateRequest: UpdateParametersByDateSchemaRequest
}
