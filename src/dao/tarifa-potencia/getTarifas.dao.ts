import { DocType } from '../../types/data'
import { DaoWithoutParam } from '../../types/methods'
import TarifaPotenciaModel from '../../apiServices/tarifa-potencia/model'
import { handleError } from '../../helpers/handleError'
import { Tarifa } from '../../types/models'

export const getTarifasDao: DaoWithoutParam<Array<DocType<Tarifa>>> = async () => {
  try {
    const tarifas = await TarifaPotenciaModel.find()
    return tarifas
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un error al obtener los parametros')
  }
}
