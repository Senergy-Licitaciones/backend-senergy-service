import { handleError } from '../../helpers/handleError'
import SessionProveedorModel from '../../apiServices/sessionProveedor/model'
import { Document, Types } from 'mongoose'
import { Dao } from '../../types/methods'
import { SessionProveedor } from '../../types/data'
/* SessionProveedorModel.watch().on('change', (change) => {
  if (change.operationType === 'delete') {
    const docKey = change.documentKey as {_id: string}
    const closeSession = async (): Promise<void> => {
      await ProveedorModel.findOneAndUpdate({ session: docKey._id }, { estado: Estado.Offline, session: '' })
    }
    void closeSession()
  }
})
*/
export const createSessionProveedor: Dao<{proveedorId: Types.ObjectId, token: string}, Document<any, any, SessionProveedor> & SessionProveedor & {
  _id: Types.ObjectId
}> = async ({ proveedorId, token }) => {
  try {
    const response = await SessionProveedorModel.create({ proveedor: proveedorId, jwt: token })
    const session = await response.save()
    return session
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al crear la sesión ')
  }
}
export const logoutProveedorDao: Dao<Types.ObjectId, Document<any, any, SessionProveedor> & SessionProveedor & {
  _id: Types.ObjectId}> = async (proveedorId) => {
  try {
    const proveedor = await SessionProveedorModel.findOneAndDelete({ proveedor: proveedorId })
    if (proveedor == null) throw new Error('La sesión no existe')
    return proveedor
  } catch (err) {
    console.log('error ', err)
    throw handleError(err, 'Ha ocurrido un error al eliminar la sesión')
  }
}
