import { addParametroDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { ErrorResponse, HistorialParametros, ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'
import { formatFromStringToDate } from '../../utils/dateFormat'

export const addParametroService: Service<Omit<HistorialParametros, 'createdAt'|'updatedAt'|'fecha'> & {fecha: string}, ErrorResponse|ResponseParent> = async (fields) => {
  try {
    const parametro = await addParametroDao({ ...fields, fecha: formatFromStringToDate(fields.fecha) })
    if ('error' in parametro) throw new Error(parametro.message)
    return {
      message: `Nuevo histórico de ${parametro.valor} agregado exitosamente`
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al agregar el dato en la capa de servicios')
  }
}
