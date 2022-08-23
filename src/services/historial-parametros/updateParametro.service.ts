import { updateParametroDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { Service } from '../../types/methods'

export const updateParametroService: Service<{id: string, valor: number, fecha: string}, {message: string}> = async (param) => {
  try {
    await updateParametroDao(param)
    return {
      message: 'Parametro actualizado exitosamente'
    }
  } catch (e) {
    throw handleError(e)
  }
}
