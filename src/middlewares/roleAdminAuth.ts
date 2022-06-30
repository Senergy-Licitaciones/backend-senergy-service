import { CheckRoleAdminAuth } from '../types/methods'

export const checkRoleAdminAuth: CheckRoleAdminAuth = (roles) => async (req, res, next) => {
  try {
    const admin = req.admin
    if (admin != null) {
      return roles.includes(admin.role) ? next() : res.status(409).send({ message: 'No cuenta con los permisos necesarios para realizar esta acción', error: true })
    }
    throw new Error('No cuentas con los permisos para acceder a este recurso')
  } catch (err) {
    const error = err as Error
    return res.status(500).send({
      message: error.message,
      error: err
    })
  }
}
