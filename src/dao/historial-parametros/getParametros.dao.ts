import { handleError } from '../../helpers/handleError'
import { DocType, ErrorResponse } from '../../types/data'
import { DaoWithoutParam } from '../../types/methods'
import { HistorialParametro } from '../../types/schemas'
import HistorialParametrosModel from '../../apiServices/historial-parametros/model'
export const getParametrosDao: DaoWithoutParam<Array<DocType<HistorialParametro>>|ErrorResponse> = async () => {
  try {
    const parametros = await HistorialParametrosModel.find()
    return parametros
  } catch (e) {
    const error = e as Error
    return handleError(error, 'Ha ocurrido un error al obtener los parametros en la capa de datos')
  }
}
