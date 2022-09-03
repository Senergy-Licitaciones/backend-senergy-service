import { handleError } from '../../helpers/handleError'
import { DocType } from '../../types/data'
import { Dao } from '../../types/methods'
import { HistorialParametroModel } from '../../types/models'
import HistorialParametrosModel from '../../apiServices/historial-parametros/model'
export const getHistorialParametrosListDao: Dao<string[], Array<DocType<HistorialParametroModel>>> = async (listIds) => {
  try {
    const parametros = await HistorialParametrosModel.find({ _id: { $in: listIds } }) as Array<DocType<HistorialParametroModel>>
    return parametros
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un erorr al obtener la lista de parametros')
  }
}
