import { handleError } from '../../helpers/handleError'
import { DaoWithoutParam } from '../../types/methods'
import TarifaEnergiaHp from '../../apiServices/tarifa-energia-hp/model'
export const deleteTarifasDao: DaoWithoutParam<void> = async () => {
  try {
    await TarifaEnergiaHp.deleteMany()
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un error al eliminar las tarifas')
  }
}
