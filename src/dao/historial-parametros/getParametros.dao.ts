import { handleError } from '../../helpers/handleError'
import { DocType } from '../../types/data'
import { DaoWithoutParam } from '../../types/methods'
import { HistorialParametro } from '../../types/schemas'
import HistorialParametrosModel from '../../apiServices/historial-parametros/model'
export const getParametrosDao: DaoWithoutParam<Array<DocType<HistorialParametro>>> = async () => {
  try {
    const parametros = await HistorialParametrosModel.find()
    return parametros
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un error al obtener los parametros')
  }
}
