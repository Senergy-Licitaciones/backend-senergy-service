import { handleError } from '../../helpers/handleError'
import { DaoWithoutParam } from '../../types/methods'
import HistorialParametrosModel from '../../apiServices/historial-parametros/model'
export const deleteParametrosDao: DaoWithoutParam<void> = async () => {
  try {
    await HistorialParametrosModel.deleteMany()
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un error al eliminar los parametros')
  }
}
