import { handleError } from '../../helpers/handleError'
import { DocType, ResponseParent } from '../../types/data'
import { Dao } from '../../types/methods'
import { Tarifa } from '../../types/models'
import TarifaEnergiaHp from '../../apiServices/tarifa-energia-hp/model'
export const updateMultipleTarifasDao: Dao<Tarifa[], ResponseParent> = async (tarifas) => {
  try {
    const response = await TarifaEnergiaHp.find().select('name') as Array<DocType<Pick<Tarifa, 'name'>>>
    const names = response.map((name) => name.name)
    await TarifaEnergiaHp.bulkWrite(
      tarifas.map((tarifa) => {
        if (names.includes(tarifa.name)) {
          return {
            updateOne: {
              filter: { name: tarifa.name },
              update: tarifa
            }
          }
        }
        return {
          insertOne: {
            document: tarifa as any
          }
        }
      })
    )
    //    await HistorialParametrosModel.collection.updateMany({}, parametros)
    return {
      message: 'Datos actualizados exitosamente'
    }
  } catch (e) {
    console.log(e)
    throw handleError(e, 'Ha ocurrido un error al actualizar las tarifas en la capa de datos')
  }
}
