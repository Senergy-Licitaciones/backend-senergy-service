import { DocType } from '../../types/data'
import { DaoWithoutParam } from '../../types/methods'
import { handleError } from '../../helpers/handleError'
import { Tarifa } from '../../types/models'
import TarifaEnergiaHfpModel from '../../apiServices/tarifa-energia-hfp/model'
export const getTarifasDao: DaoWithoutParam<Array<DocType<Tarifa>>> = async () => {
  try {
    const tarifas = await TarifaEnergiaHfpModel.find()
    return tarifas
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un error al obtener las tarifas')
  }
}
