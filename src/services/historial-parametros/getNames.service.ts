import { getParametrosNameDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { DocType } from '../../types/data'
import { ServiceWithoutParam } from '../../types/methods'
import { HistorialParametroModel } from '../../types/models'

export const getNamesService: ServiceWithoutParam<Array<DocType<Pick<HistorialParametroModel, 'name'>>>> = async () => {
  try {
    const parametros = await getParametrosNameDao()
    return parametros.filter((parametro) => !parametro.name.includes('US$') && !parametro.name.includes('Incremento_Anual') && !parametro.name.includes('R500') && !parametro.name.includes('TC'))
  } catch (e) {
    throw handleError(e)
  }
}
