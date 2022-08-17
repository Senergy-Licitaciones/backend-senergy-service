import { ResponseParent } from '../../types/data'
import { Dao } from '../../types/methods'
import { HistorialParametroModel } from '../../types/models'
import HistorialParametrosModel from '../../apiServices/historial-parametros/model'
import { handleError } from '../../helpers/handleError'

export const insertMultipleParametrosDao: Dao<HistorialParametroModel[], ResponseParent> = async (parametros: HistorialParametroModel[]) => {
  try {
    await HistorialParametrosModel.collection.insertMany(parametros)
    return {
      message: 'Datos agregados exitosamente'
    }
  } catch (e) {
    console.log(e)
    throw handleError(e, 'Ha ocurrido un error al agregar los parametros')
  }
}
