import SessionUserModel from '../../apiServices/sessionUser/model'
import { handleError } from '../../helpers/handleError'
import { ResponseId, ResponseParent } from '../../types/data'
import { Dao } from '../../types/methods'
/* SessionUserModel.watch().on('change', (change) => {
  if (change.operationType === 'delete') {
    const docKey = change.documentKey as {_id: string}
    const closeSession = async (): Promise<void> => {
      await UsuarioModel.findOneAndUpdate({ sessionId: docKey._id }, { estado: Estado.Offline, sessionId: null })
    }
    void closeSession()
  }
}) */
export const createSessionUser: Dao<{idUser: string, token: string}, ResponseId> = async ({ idUser, token }) => {
  try {
    const response = await SessionUserModel.create({ user: idUser, jwt: token })
    const session = await response.save()
    return {
      message: 'Sesión creada exitosamente',
      _id: session._id
    }
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al crear la sesión')
  }
}
export const logoutUserDao: Dao<string, ResponseParent> = async (id) => {
  try {
    const response = await SessionUserModel.findOneAndDelete({ user: id })
    console.log('response ', response)
    return {
      message: 'Sesión cerrada exitosamente'
    }
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al cerrar sesión con los datos')
  }
}
