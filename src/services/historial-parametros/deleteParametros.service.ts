import { deleteParametrosDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { ServiceWithoutParam } from '../../types/methods'

export const deleteParametrosService: ServiceWithoutParam<{message: string}> = async () => {
  try {
    await deleteParametrosDao()
    return {
      message: 'Parametros eliminados exitosamente'
    }
  } catch (e) {
    throw handleError(e)
  }
}
