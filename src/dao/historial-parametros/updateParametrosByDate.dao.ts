import { handleError } from '../../helpers/handleError'
import { Dao } from '../../types/methods'
import { ParametroValue } from '../../types/models'
import HistorialParametrosModel from '../../apiServices/historial-parametros/model'
interface Params {
  fecha: string
  parametros: ParametroValue[]
}
export const updateParametrosByDateDao: Dao<Params, {message: string}> = async ({ fecha, parametros }) => {
  try {
    await HistorialParametrosModel.bulkWrite(
      parametros.map((parametro) => {
        return {
          updateOne: {
            filter: { _id: parametro._id },
            update: {
              $push: {
                values: {
                  fecha,
                  value: parametro.value
                }
              }
            }
          }
        }
      })

    )
    return {
      message: 'Parametros actualizados exitosamente'
    }
  } catch (e) {
    throw handleError(e)
  }
}
