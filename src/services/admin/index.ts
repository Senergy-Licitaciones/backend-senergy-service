import { createAdminDao } from '../../dao/admin'
import { encrypt } from '../../helpers/handleBcrypt'
import { handleError } from '../../helpers/handleError'
import { Admin, ErrorResponse, ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'

export const createAdminService: Service<Omit<Admin, 'createdAt'|'updatedAt'>, ErrorResponse|ResponseParent> = async (fields) => {
  try {
    const hash = await encrypt(fields.password)
    if (typeof hash !== 'string') throw new Error(hash.message)
    const admin = await createAdminDao({ ...fields, password: hash })
    if ('error' in admin) throw new Error(admin.message)
    return {
      message: `Cuenta ${admin.correo} creada exitosamente`
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al crear un Administrador en la capa de servicios')
  }
}
