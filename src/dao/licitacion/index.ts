import { handleError } from '../../helpers/handleError'
import LicitacionModel from '../../apiServices/licitacion/model'
import { DocType, ErrorResponse, Licitacion, ResponseParent } from '../../types/data'
import { Document, Types, UpdateQuery } from 'mongoose'
import { Dao, DaoWithoutParam } from '../../types/methods'
import { Estado } from '../../types/form/enums'
export const showLicitacionesDao: DaoWithoutParam<ErrorResponse|Array<Document<any, any, Licitacion> & Licitacion & {
  _id: Types.ObjectId}>> = async () => {
  try {
    const licitaciones = await LicitacionModel.find().populate('tipoServicio')
    return licitaciones
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos')
  }
}
export const createLicitacionDao: Dao<Omit<Licitacion, '_id'|'participantes'|'createdAt'|'updatedAt'>, ErrorResponse|ResponseParent> = async (fields) => {
  try {
    await LicitacionModel.create({ ...fields })
    return {
      message: 'Licitacion creada exitosamente'
    }
  } catch (err) {
    console.log('error ', err)
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos')
  }
}
export const updateLicitacionDao: Dao<{fields: UpdateQuery<Partial<Omit<Licitacion, '_id'>>>, id: Types.ObjectId}, ErrorResponse|ResponseParent> = async ({ fields, id }) => {
  try {
    const result = await LicitacionModel.findByIdAndUpdate(id, { ...fields }, { new: true })
    if (result == null) throw new Error('No se encontró la licitación')
    return {
      message: 'Licitación actualizada exitosamente'
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos')
  }
}
export const getTiposDao: Dao<string, ErrorResponse|Array<Document<any, any, Licitacion> & Licitacion & {
  _id: Types.ObjectId}>> = async (id: string) => {
  try {
    const result = await LicitacionModel.find({ usuario: id }).select('-participantes -usuario -puntoSum -brg -meses -tipoServicio')
    return result
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos')
  }
}
export const getLicitacionesFreeDao: Dao<Types.ObjectId, ErrorResponse|Array<Document<any, any, Licitacion> & Licitacion & {
  _id: Types.ObjectId}>> = async (proveedorId) => {
  try {
    const licitaciones = await LicitacionModel.find({
      $nor: [{ participantes: proveedorId }]
    }).populate('tipoServicio')
    return licitaciones
  } catch (err) {
    console.log('error ', err)
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos al obtener licitaciones libres')
  }
}
export const getLicitacionByIdDao: Dao<Types.ObjectId, ErrorResponse|DocType<Licitacion>> = async (id) => {
  try {
    const licitacion = await LicitacionModel.findById(id).select('-usuario -participantes').populate('tipoServicio puntoSum brg')
    // if (!licitacion) throw new Error('La licitación no existe')
    return licitacion
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos al mostrar la licitación ')
  }
}
export const getLicitacionesByUserDao: Dao<Types.ObjectId, ErrorResponse|Array<DocType<Licitacion>>> = async (id) => {
  try {
    const licitaciones = await LicitacionModel.find({ usuario: id })
    return licitaciones
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos al obtener las licitaciones')
  }
}
export const getLicitacionesToProveedorDashboardDao: Dao<Types.ObjectId, ErrorResponse|Array<DocType<Pick<Licitacion, 'empresa'|'fechaInicioApertura'|'fechaFinApertura'|'createdAt'|'updatedAt'|'participantes'>>>> = async (proveedorId) => {
  try {
    const licitaciones = await LicitacionModel.find({ $nor: [{ participantes: proveedorId }], estado: Estado.Abierto }).select('empresa fechaInicioApertura fechaFinApertura participantes createdAt updatedAt') as Array<DocType<Pick<Licitacion, 'participantes'|'empresa'|'fechaInicioApertura'|'fechaFinApertura'|'createdAt'|'updatedAt'>>>
    console.log('licitaciones', licitaciones)
    return licitaciones
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al obtener la información en la capa de datos')
  }
}
