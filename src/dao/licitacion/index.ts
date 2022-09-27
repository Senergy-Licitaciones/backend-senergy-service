import { handleError } from '../../helpers/handleError'
import LicitacionModel from '../../apiServices/licitacion/model'
import { DocType, Licitacion, ResponseParent } from '../../types/data'
import { Document, Types, UpdateQuery } from 'mongoose'
import { Dao, DaoWithoutParam } from '../../types/methods'
import { Estado } from '../../types/form/enums'
import { LicitacionToAdmin } from '../../types/responses'
export const showLicitacionesDao: DaoWithoutParam<Array<Document<any, any, Licitacion> & Licitacion & {
  _id: Types.ObjectId}>> = async () => {
  try {
    const licitaciones = await LicitacionModel.find().populate('tipoServicio')
    return licitaciones
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al obtener las licitaciones')
  }
}
export const createLicitacionDao: Dao<Omit<Licitacion, '_id'|'participantes'|'createdAt'|'updatedAt'>, ResponseParent> = async (fields) => {
  try {
    await LicitacionModel.create({ ...fields })
    return {
      message: 'Licitacion creada exitosamente'
    }
  } catch (err) {
    console.log('error ', err)
    throw handleError(err, 'Ha ocurrido un error al crear la licitacion')
  }
}
export const updateLicitacionDao: Dao<{fields: UpdateQuery<Partial<Omit<Licitacion, '_id'>>>, id: Types.ObjectId}, ResponseParent> = async ({ fields, id }) => {
  try {
    const result = await LicitacionModel.findByIdAndUpdate(id, { ...fields }, { new: true })
    if (result == null) throw new Error('No se encontró la licitación')
    return {
      message: 'Licitación actualizada exitosamente'
    }
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al actualizar la licitación')
  }
}
export const getTiposDao: Dao<string, Array<Document<any, any, Licitacion> & Licitacion & {
  _id: Types.ObjectId}>> = async (id: string) => {
  try {
    const result = await LicitacionModel.find({ usuario: id }).select('-participantes -usuario -puntoSum -brg -meses -tipoServicio')
    return result
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al obtener los tipos de licitación')
  }
}
export const getLicitacionesFreeDao: Dao<Types.ObjectId, Array<Document<any, any, Licitacion> & Licitacion & {
  _id: Types.ObjectId}>> = async (proveedorId) => {
  try {
    const licitaciones = await LicitacionModel.find({
      $nor: [{ participantes: proveedorId }]
    }).populate('tipoServicio')
    return licitaciones
  } catch (err) {
    console.log('error ', err)
    throw handleError(err, 'Ha ocurrido un error al obtener las licitaciones libres')
  }
}
export const getLicitacionByIdDao: Dao<Types.ObjectId, DocType<Licitacion>> = async (id) => {
  try {
    const licitacion = await LicitacionModel.findById(id).select('-usuario -participantes').populate('tipoServicio puntoSum brg') as DocType<Licitacion>
    // if (!licitacion) throw new Error('La licitación no existe')
    return licitacion
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al mostrar la licitación ')
  }
}
export const getLicitacionesByUserDao: Dao<Types.ObjectId, Array<DocType<Licitacion>>> = async (id) => {
  try {
    const licitaciones = await LicitacionModel.find({ usuario: id })
    return licitaciones
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al obtener las licitaciones por usuario')
  }
}
export const getLicitacionesToProveedorDashboardDao: Dao<Types.ObjectId, Array<DocType<Pick<Licitacion, 'empresa'|'fechaInicioApertura'|'fechaFinApertura'|'createdAt'|'updatedAt'|'participantes'>>>> = async (proveedorId) => {
  try {
    const licitaciones = await LicitacionModel.find({ $nor: [{ participantes: proveedorId }], estado: Estado.Abierto }).select('empresa fechaInicioApertura fechaFinApertura participantes createdAt updatedAt') as Array<DocType<Pick<Licitacion, 'participantes'|'empresa'|'fechaInicioApertura'|'fechaFinApertura'|'createdAt'|'updatedAt'>>>
    console.log('licitaciones', licitaciones)
    return licitaciones
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al obtener la información del proveedor')
  }
}
export const getLicitacionesToAdminDao: DaoWithoutParam<LicitacionToAdmin[]> = async () => {
  try {
    const licitaciones = await LicitacionModel.find().select('createdAt updatedAt author empresa estado fechaInicioApertura fechaFinApertura participantes fechaInicio fechaFin')
    return licitaciones
  } catch (e) {
    throw handleError(e, 'Ha courrido un error al obtener las licitaciones')
  }
}
export const getDataFromLicitacionToCalculo: Dao<Types.ObjectId, Pick<Licitacion, 'factorPlanta'|'meses'>> = async (idLicitacion) => {
  try {
    const response = await LicitacionModel.findById(idLicitacion).select('factorPlanta meses') as DocType<Pick<Licitacion, 'factorPlanta'|'meses'>>
    if (response == null) throw new Error('Licitacion no encontrada')
    return response
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un error al obtener las licitaciones')
  }
}
