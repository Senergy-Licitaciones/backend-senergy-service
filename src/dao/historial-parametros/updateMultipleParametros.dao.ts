import { handleError } from '../../helpers/handleError'
import { ErrorResponse, ResponseParent } from '../../types/data'
import { Dao } from '../../types/methods'
import HistorialParametrosModel from '../../apiServices/historial-parametros/model'
import { HistorialParametroModel } from '../../types/models'
export const updateMultipleParametrosDao: Dao<HistorialParametroModel[], ResponseParent|ErrorResponse> = async (parametros) => {
  try {
    await HistorialParametrosModel.bulkWrite(
      parametros.map((parametro) => ({
        updateOne: {
          filter: { name: parametro.name },
          update: parametro
        }
      }))
    )
    //    await HistorialParametrosModel.collection.updateMany({}, parametros)
    return {
      message: 'Datos actualizados exitosamente'
    }
  } catch (e) {
    console.log(e)
    const error = e as Error
    return handleError(error, 'Ha ocurrido un error al actualizar los parametros en la capa de datos')
  }
}
