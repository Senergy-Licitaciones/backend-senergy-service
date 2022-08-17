import { CheckRoleAuth } from '../types/methods'

const checkRoleAuth: CheckRoleAuth = (roles) => async (req, res, next) => {
  try {
    const proveedor = req.proveedor
    const user = req.user
    if (proveedor != null) {
      return roles.includes(proveedor.role) ? next() : res.status(409).send({ message: 'Usuario sin permisos' })
    };
    if (user != null) {
      return roles.includes(user.role) ? next() : res.status(409).send({ message: 'Proveedor sin permisos' })
    };
    throw new Error('No tiene acceso a este recurso')
  } catch (err) {
    console.log('error role auth ', err)
    return res.status(500).send({
      message: 'Ha ocurrido un error en la autenticación'
    })
  }
}
export default checkRoleAuth
