import { updateParametrosByDateDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { Service } from '../../types/methods'
import { ParametroValue } from '../../types/models'
interface Params {
  fecha: string
  parametros: ParametroValue[]
}
export const updateParametrosByDateService: Service<Params, {message: string}> = async ({ fecha, parametros }) => {
  try {
    const response = await updateParametrosByDateDao({ fecha, parametros })
    return response
  } catch (e) {
    throw handleError(e)
  }
}
