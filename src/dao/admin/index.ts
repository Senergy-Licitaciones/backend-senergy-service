import { handleError } from '../../helpers/handleError'
import { Admin, DocType } from '../../types/data'
import AdminModel from '../../apiServices/admin/model'
import { Dao, DaoWithoutParam } from '../../types/methods'
export const getAccountDao: Dao<string, DocType<Admin>> = async (correo) => {
  try {
    const admin = await AdminModel.findOne({ correo })
    if (admin == null) throw new Error('Cuenta no encontrada, credenciales incorrectas')
    return admin
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al obtener la cuenta de tipo Administrativo')
  }
}
export const createAdminDao: Dao<Omit<Admin, 'createdAt'|'updatedAt'>, DocType<Admin>> = async (fields) => {
  try {
    const admin = await AdminModel.create(fields)
    const response = await admin.save()
    return response
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al crear un Administrador')
  }
}
export const getAdminsDao: DaoWithoutParam<Array<DocType<Admin>>> = async () => {
  try {
    const admins = await AdminModel.find()
    return admins
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al obtener la lista de administradores')
  }
}
export const deleteAdminDao: Dao<string, null> = async (id) => {
  try {
    await AdminModel.findByIdAndDelete(id)
    return null
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al eliminar la cuenta de tipo Administrador')
  }
}
export const updateAdminDao: Dao<{fields: Partial<Admin>, id: string}, DocType<Admin>> = async ({ fields, id }) => {
  try {
    const admin = await AdminModel.findByIdAndUpdate(id, fields, { new: true })
    if (admin == null) throw new Error('Cuenta no encontrada')
    return admin
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al actualizar la cuenta de tipo Administrador')
  }
}
