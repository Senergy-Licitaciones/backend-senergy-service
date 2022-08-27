import { getTarifasDao } from '../../dao/tarifa-potencia'
import { handleError } from '../../helpers/handleError'
import { ServiceWithoutParam } from '../../types/methods'
import { Tarifa } from '../../types/models'

export const getTarifasService: ServiceWithoutParam<Tarifa[]> = async () => {
  try {
    const parametros = await getTarifasDao()
    return parametros
  } catch (e) {
    throw handleError(e)
  }
}
