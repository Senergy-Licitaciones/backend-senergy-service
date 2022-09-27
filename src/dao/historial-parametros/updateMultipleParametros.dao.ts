import { handleError } from '../../helpers/handleError'
import { DocType, ResponseParent } from '../../types/data'
import { Dao } from '../../types/methods'
import HistorialParametrosModel from '../../apiServices/historial-parametros/model'
import { HistorialParametroModel } from '../../types/models'
import { HistorialParametro } from '../../types/schemas'
export const updateMultipleParametrosDao: Dao<HistorialParametroModel[], ResponseParent> = async (parametros) => {
  try {
    const response = await HistorialParametrosModel.find().select('name') as Array<DocType<Pick<HistorialParametro, 'name'>>>
    const names = response.map((name) => name.name)
    await HistorialParametrosModel.bulkWrite(
      parametros.map((parametro) => {
        if (names.includes(parametro.name)) {
          return {
            updateOne: {
              filter: { name: parametro.name },
              update: parametro
            }
          }
        }
        return {
          insertOne: {
            document: parametro as any
          }
        }
      })
    )
    //  await HistorialParametrosModel.collection.updateMany({}, parametros)
    return {
      message: 'Datos actualizados exitosamente'
    }
  } catch (e) {
    console.log(e)
    throw handleError(e, 'Ha ocurrido un error al actualizar los parametros en la capa de datos')
  }
}
