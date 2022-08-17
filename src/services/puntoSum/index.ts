import { getPuntoSumDao, createPuntoSumDao } from '../../dao/puntoSum'
import { handleError } from '../../helpers/handleError'
import { DocType, ResponseParent } from '../../types/data'
import { FieldsAdd } from '../../types/form'
import { Service, ServiceWithoutParam } from '../../types/methods'

export const getPuntoSumService: ServiceWithoutParam<Array<DocType<FieldsAdd>>> = async () => {
  try {
    const result = await getPuntoSumDao()
    return result
  } catch (err) {
    throw handleError(err)
  }
}
export const addPuntoSumService: Service<FieldsAdd, ResponseParent> = async (fields) => {
  try {
    const response = await createPuntoSumDao(fields)
    return response
  } catch (err) {
    throw handleError(err)
  }
}
