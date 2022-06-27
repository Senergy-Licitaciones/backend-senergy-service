import { createAdminDao } from '../../dao/admin'
import { handleError } from '../../helpers/handleError'
import { Admin, ErrorResponse, ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'

export const createAdminService: Service<Omit<Admin, 'createdAt'|'updatedAt'>, ErrorResponse|ResponseParent> = async (fields) => {
  try {
    const admin = await createAdminDao(fields)
    if ('error' in admin) throw new Error(admin.message)
    return {
      message: `Cuenta ${admin.correo} creada exitosamente`
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al crear un Administrador en la capa de servicios')
  }
}
