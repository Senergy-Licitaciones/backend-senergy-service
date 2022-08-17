import { getServiciosDao, createServicioDao } from '../../dao/servicio'
import { handleError } from '../../helpers/handleError'
import { DocType, ResponseParent } from '../../types/data'
import { FieldsAdd } from '../../types/form'
import { Service, ServiceWithoutParam } from '../../types/methods'

export const getServiciosService: ServiceWithoutParam<Array<DocType<FieldsAdd>>> = async () => {
  try {
    const result = await getServiciosDao()
    return result
  } catch (err) {
    throw handleError(err)
  }
}
export const addServicioService: Service<FieldsAdd, ResponseParent> = async (fields) => {
  try {
    const response = await createServicioDao(fields)
    return response
  } catch (err) {
    throw handleError(err)
  }
}
