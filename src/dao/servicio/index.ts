import { handleError } from '../../helpers/handleError'
import ServicioModel from '../../apiServices/servicio/model'
import { FieldsAdd } from '../../types/form'
import { Dao, DaoWithoutParam } from '../../types/methods'
import { ResponseParent } from '../../types/data'
import { Document, Types } from 'mongoose'
export const getServiciosDao: DaoWithoutParam<Array<Document<any, any, FieldsAdd> & FieldsAdd & {
  _id: Types.ObjectId}>> = async () => {
  try {
    const result = await ServicioModel.find()
    return result
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al obtener los servicios')
  }
}
export const createServicioDao: Dao<FieldsAdd, ResponseParent> = async (fields) => {
  try {
    const response = await ServicioModel.create({ name: fields.name })
    const servicio = await response.save()
    return {
      message: `Servicio ${servicio.name} agregado exitosamente `
    }
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al agregar el nuevo servicio')
  }
}
