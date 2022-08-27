import { handleError } from '../../helpers/handleError'
import { ResponseParent } from '../../types/data'
import { Dao } from '../../types/methods'
import { Tarifa } from '../../types/models'
import TarifaEnergiaHp from '../../apiServices/tarifa-energia-hp/model'
export const insertMultipleTarifasDao: Dao<Tarifa[], ResponseParent> = async (tarifas) => {
  try {
    await TarifaEnergiaHp.insertMany(tarifas)
    return {
      message: 'Datos agregados exitosamente'
    }
  } catch (e) {
    console.log(e)
    throw handleError(e, 'Ha ocurrido un error al agregar las tarifas')
  }
}
