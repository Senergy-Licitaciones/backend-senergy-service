import { deleteTarifasDao } from '../../dao/tarifa-potencia'
import { handleError } from '../../helpers/handleError'
import { ServiceWithoutParam } from '../../types/methods'

export const deleteTarifasService: ServiceWithoutParam<{message: string}> = async () => {
  try {
    await deleteTarifasDao()
    return {
      message: 'Tarifas eliminados exitosamente'
    }
  } catch (e) {
    throw handleError(e)
  }
}
