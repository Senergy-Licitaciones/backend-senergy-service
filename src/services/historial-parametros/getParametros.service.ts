import { getParametrosDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { ServiceWithoutParam } from '../../types/methods'
import { HistorialParametroModel } from '../../types/models'

export const getParametrosService: ServiceWithoutParam<HistorialParametroModel[]> = async () => {
  try {
    const parametros = await getParametrosDao()
    return parametros
  } catch (e) {
    throw handleError(e)
  }
}
