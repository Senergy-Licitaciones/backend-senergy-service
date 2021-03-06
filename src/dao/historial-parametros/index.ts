import { handleError } from '../../helpers/handleError'
import { DocType, ErrorResponse, HistorialParametros } from '../../types/data'
import HistorialParametrosModel from '../../apiServices/historial-parametros/model'
import { Dao } from '../../types/methods'

export const addParametroDao: Dao<Omit<HistorialParametros, 'createdAt'|'updatedAt'>, ErrorResponse|DocType<HistorialParametros>> = async (fields) => {
  try {
    const parametro = await HistorialParametrosModel.create(fields)
    const response = await parametro.save()
    return response
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al agregar el histórico en la capa de datos')
  }
}
