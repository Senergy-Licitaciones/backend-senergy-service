import { updateTarifaDao } from '../../dao/tarifa-potencia'
import { handleError } from '../../helpers/handleError'
import { Service } from '../../types/methods'

export const updateTarifaService: Service<{id: string, valor: number, fecha: string}, {message: string}> = async (param) => {
  try {
    await updateTarifaDao(param)
    return {
      message: 'Parametro actualizado exitosamente'
    }
  } catch (e) {
    throw handleError(e)
  }
}
