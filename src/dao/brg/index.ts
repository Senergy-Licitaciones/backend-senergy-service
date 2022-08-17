import { handleError } from '../../helpers/handleError'
import BrgModel from '../../apiServices/brg/model'
import { FieldsAdd } from '../../types/form'
import { Dao, DaoWithoutParam } from '../../types/methods'
import { ResponseParent } from '../../types/data'
import { Document, Types } from 'mongoose'

export const getBrgDao: DaoWithoutParam<Array<Document<any, any, FieldsAdd> & FieldsAdd & {
  _id: Types.ObjectId}>> = async () => {
  try {
    const result = await BrgModel.find()
    return result
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al obtener la lista de BRG')
  }
}
export const createBrgDao: Dao<FieldsAdd, ResponseParent> = async (fields) => {
  try {
    const response = await BrgModel.create<FieldsAdd>({ name: fields.name })
    const brg = await response.save()
    return {
      message: `BRG ${brg.name} añadido exitosamente `
    }
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al crear un nuevo BRG')
  }
}
