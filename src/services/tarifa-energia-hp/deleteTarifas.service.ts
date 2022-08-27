import { deleteTarifasDao } from '../../dao/tarifa-energia-hp'
import { handleError } from '../../helpers/handleError'
import { ServiceWithoutParam } from '../../types/methods'

export const deleteTarifasService: ServiceWithoutParam<{message: string}> = async () => {
  try {
    await deleteTarifasDao()
    return {
      message: 'Tarifas eliminadas exitosamente'
    }
  } catch (e) {
    throw handleError(e)
  }
}
