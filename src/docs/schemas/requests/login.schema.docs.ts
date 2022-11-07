export const LoginRequestSchema = {
  type: 'object',
  properties: {
    correo: {
      type: 'string',
      example: 'admin@senergy.com'
    },
    password: {
      type: 'string',
      example: '12345678'
    }
  }
}
