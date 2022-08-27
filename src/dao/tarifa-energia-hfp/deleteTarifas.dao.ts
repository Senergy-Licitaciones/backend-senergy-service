import { handleError } from '../../helpers/handleError'
import { DaoWithoutParam } from '../../types/methods'
import TarifaEnergiaHfpModel from '../../apiServices/tarifa-energia-hfp/model'
export const deleteTarifasDao: DaoWithoutParam<void> = async () => {
  try {
    await TarifaEnergiaHfpModel.deleteMany()
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un error al eliminar las tarifas')
  }
}
