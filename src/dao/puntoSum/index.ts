import { handleError } from '../../helpers/handleError'
import PuntoSumModel from '../../apiServices/puntoSum/model'
import { FieldsAdd } from '../../types/form'
import { Dao, DaoWithoutParam } from '../../types/methods'
import { ResponseParent } from '../../types/data'
import { Document, Types } from 'mongoose'
export const getPuntoSumDao: DaoWithoutParam<Array<Document<any, any, FieldsAdd> & FieldsAdd & {
  _id: Types.ObjectId}>> = async () => {
  try {
    const result = await PuntoSumModel.find()
    return result
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al obtener los puntos de suministro')
  }
}
export const createPuntoSumDao: Dao<FieldsAdd, ResponseParent> = async (fields) => {
  try {
    const response = await PuntoSumModel.create({ name: fields.name })
    const puntoSum = await response.save()
    return {
      message: `Punto de suministro ${puntoSum.name} agregado exitosamente`
    }
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al crear un nuevo punto de suministro')
  }
}
