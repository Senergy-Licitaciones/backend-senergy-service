export const AdminSchema = {
  type: 'object',
  required: ['name', 'correo', 'password', 'role'],
  properties: {
    name: {
      type: 'string'
    },
    correo: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    role: {
      type: 'string',
      enum: ['jefe | empleado']
    }
  }
}
