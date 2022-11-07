import swaggerJSDoc from 'swagger-jsdoc'
import { AdminSchema, ParametroNameSchema } from './schemas'
import { LoginRequestSchema, UpdateParameterByIdRequestSchema, UpdateParametersByDateSchemaRequest } from './schemas/requests'
import { LoginAdminResponseSchema, ResponseAdminSchema, ResponseCalculoSchema, ResponseMessageSchema } from './schemas/responses'

export const SchemasApp: {
  [key: string]: swaggerJSDoc.Reference | swaggerJSDoc.Schema
} | undefined = {
  admin: AdminSchema,
  loginRequest: LoginRequestSchema,
  loginResponse: LoginAdminResponseSchema,
  responseAdmin: ResponseAdminSchema,
  responseMessage: ResponseMessageSchema,
  responseCalculo: ResponseCalculoSchema,
  parametroName: ParametroNameSchema,
  updateParametersByDateRequest: UpdateParametersByDateSchemaRequest,
  updateParameterByIdRequest: UpdateParameterByIdRequestSchema
}
