import { DocType } from '../../types/data'
import { DaoWithoutParam } from '../../types/methods'
import { handleError } from '../../helpers/handleError'
import { Tarifa } from '../../types/models'
import TarifaEnergiaHp from '../../apiServices/tarifa-energia-hp/model'

export const getTarifasDao: DaoWithoutParam<Array<DocType<Tarifa>>> = async () => {
  try {
    const tarifas = await TarifaEnergiaHp.find()
    return tarifas
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un error al obtener las tarifas')
  }
}
