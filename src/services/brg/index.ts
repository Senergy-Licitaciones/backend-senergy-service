import { getBrgDao, createBrgDao } from '../../dao/brg'
import { handleError } from '../../helpers/handleError'
import { DocType, ResponseParent } from '../../types/data'
import { FieldsAdd } from '../../types/form'
import { Service, ServiceWithoutParam } from '../../types/methods'

export const getBrgService: ServiceWithoutParam<Array<DocType<FieldsAdd>>> = async () => {
  try {
    const result = await getBrgDao()
    return result
  } catch (err) {
    throw handleError(err)
  }
}
export const addBrgService: Service<FieldsAdd, ResponseParent> = async (fields) => {
  try {
    const response = await createBrgDao(fields)
    return response
  } catch (err) {
    throw handleError(err)
  }
}
