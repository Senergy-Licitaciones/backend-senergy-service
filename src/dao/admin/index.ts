import { handleError } from '../../helpers/handleError'
import { Admin, DocType, ErrorResponse } from '../../types/data'
import AdminModel from '../../apiServices/admin/model'
import { Dao, DaoWithoutParam } from '../../types/methods'
export const getAccountDao: Dao<string, ErrorResponse|DocType<Admin>> = async (correo) => {
  try {
    const admin = await AdminModel.findOne({ correo })
    if (admin == null) throw new Error('Cuenta no encontrada, credenciales incorrectas')
    return admin
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al obtener la cuenta de tipo Administrativo')
  }
}
export const createAdminDao: Dao<Omit<Admin, 'createdAt'|'updatedAt'>, ErrorResponse|DocType<Admin>> = async (fields) => {
  try {
    const admin = await AdminModel.create(fields)
    const response = await admin.save()
    return response
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al crear un Administrador en la capa de datos')
  }
}
export const getAdminsDao: DaoWithoutParam<ErrorResponse|Array<DocType<Admin>>> = async () => {
  try {
    const admins = await AdminModel.find()
    return admins
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos al obtener la lista de administradores')
  }
}
