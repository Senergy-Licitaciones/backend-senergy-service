import { createAdminDao, deleteAdminDao, getAdminsDao, updateAdminDao } from '../../dao/admin'
import { encrypt } from '../../helpers/handleBcrypt'
import { handleError } from '../../helpers/handleError'
import { Admin, DocType, ResponseParent } from '../../types/data'
import { Service, ServiceWithoutParam } from '../../types/methods'

export const createAdminService: Service<Omit<Admin, 'createdAt'|'updatedAt'>, ResponseParent> = async (fields) => {
  try {
    const hash = await encrypt(fields.password)
    const admin = await createAdminDao({ ...fields, password: hash })
    return {
      message: `Cuenta ${admin.correo} creada exitosamente`
    }
  } catch (err) {
    throw handleError(err)
  }
}
export const getAdminsService: ServiceWithoutParam<Array<DocType<Admin>>> = async () => {
  try {
    const admins = await getAdminsDao()
    return admins
  } catch (err) {
    throw handleError(err)
  }
}
export const deleteAdminService: Service<string, ResponseParent> = async (id) => {
  try {
    await deleteAdminDao(id)
    return {
      message: 'Cuenta eliminada exitosamente'
    }
  } catch (err) {
    throw handleError(err)
  }
}
export const updateAdminService: Service<{fields: Partial<Admin>, id: string}, ResponseParent> = async ({ fields, id }) => {
  try {
    const admin = await updateAdminDao({ id, fields })
    return {
      message: `Cuenta ${admin.correo} actualizada exitosamente`
    }
  } catch (err) {
    throw handleError(err)
  }
}
