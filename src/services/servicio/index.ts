import { getServiciosDao, createServicioDao } from '../../dao/servicio'
import { handleError } from '../../helpers/handleError'
import { DocType, ErrorResponse, ResponseParent } from '../../types/data'
import { FieldsAdd } from '../../types/form'
import { Service, ServiceWithoutParam } from '../../types/methods'

export const getServiciosService: ServiceWithoutParam<ErrorResponse|Array<DocType<FieldsAdd>>> = async () => {
  try {
    const result = await getServiciosDao()
    if ('error' in result) return handleError(result.error, result.message)
    return result
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios')
  }
}
export const addServicioService: Service<FieldsAdd, ErrorResponse|ResponseParent> = async (fields) => {
  try {
    const response = await createServicioDao(fields)
    if ('error' in response) return handleError(response.error, response.message)
    return response
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios')
  }
}
