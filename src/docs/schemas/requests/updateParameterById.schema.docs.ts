export const UpdateParameterByIdRequestSchema = {
  type: 'object',
  properties: {
    fecha: {
      type: 'string',
      example: '8-2022'
    },
    value: {
      type: 'number',
      example: 221.493492
    }
  }
}
