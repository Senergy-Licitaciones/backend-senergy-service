import { handleError } from '../../helpers/handleError'
import { DocType } from '../../types/data'
import { DaoWithoutParam } from '../../types/methods'
import { HistorialParametroModel } from '../../types/models'
import HistorialParametrosModel from '../../apiServices/historial-parametros/model'
export const getParametrosNameDao: DaoWithoutParam<Array<DocType<Pick<HistorialParametroModel, 'name'>>>> = async () => {
  try {
    const parametros = await HistorialParametrosModel.find().select('name') as Array<DocType<Pick<HistorialParametroModel, 'name'>>>
    return parametros
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un error al obtener los parametros')
  }
}
