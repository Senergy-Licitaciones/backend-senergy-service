import { getTarifasDao } from '../../dao/tarifa-energia-hp'
import { handleError } from '../../helpers/handleError'
import { ServiceWithoutParam } from '../../types/methods'
import { Tarifa } from '../../types/models'

export const getTarifasService: ServiceWithoutParam<Tarifa[]> = async () => {
  try {
    const tarifas = await getTarifasDao()
    return tarifas
  } catch (e) {
    throw handleError(e)
  }
}
