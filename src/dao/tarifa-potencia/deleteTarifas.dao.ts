import { handleError } from '../../helpers/handleError'
import { DaoWithoutParam } from '../../types/methods'
import TarifaPotenciaModel from '../../apiServices/tarifa-potencia/model'
export const deleteTarifasDao: DaoWithoutParam<void> = async () => {
  try {
    await TarifaPotenciaModel.deleteMany()
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un error al eliminar las tarifas')
  }
}
