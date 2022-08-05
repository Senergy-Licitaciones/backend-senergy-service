import { Types } from 'mongoose'
import OfertaModel from '../../apiServices/oferta/model'
import { handleError } from '../../helpers/handleError'
import { DocType, ErrorResponse, Licitacion, Oferta, OfertaData } from '../../types/data'
import { Dao } from '../../types/methods'
export const crearOfertaDao: Dao<OfertaData&{proveedor: Types.ObjectId}, ErrorResponse|DocType<Oferta>> = async (fields) => {
  try {
    console.log('fields ', fields)
    const oferta = await OfertaModel.create(fields)
    const result = await oferta.save()
    console.log('oferta: ', oferta)
    console.log('result ', result)
    return result
  } catch (err) {
    console.log('error ', err)
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos al crear la oferta')
  }
}
export const getOfertasDao: Dao<Types.ObjectId, ErrorResponse|Array<DocType<Oferta>>> = async (id) => {
  try {
    const ofertas = await OfertaModel.find({
      proveedor: id
    }).populate('licitacion')
    return ofertas
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos al obtener las ofertas')
  }
}
export const getOfertaByIdDao: Dao<Types.ObjectId, ErrorResponse|DocType<Oferta>> = async (ofertaId) => {
  try {
    const oferta = await OfertaModel.findById(ofertaId)
    if (oferta == null) throw new Error('No eexiste la oferta seleccionada')
    return oferta
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos al obtener la oferta')
  }
}
export const updateOfertaDao: Dao<{ofertaId: Types.ObjectId, fields: Partial<Omit<Oferta, 'licitacion'>>}, ErrorResponse|DocType<Oferta> & {
  licitacion: Licitacion}> = async ({ ofertaId, fields }) => {
  try {
    const date = Date.now()
    const oferta = await OfertaModel.findById(ofertaId).populate<{licitacion: Licitacion}>('licitacion')
    // if (!oferta) throw new Error('La oferta seleccionada no existe')
    if (new Date(oferta.licitacion.fechaFinApertura).getMilliseconds() > date) throw new Error('El plazo de tiempo para modificar esta oferta ya culminó')
    const result = await oferta.update(fields)
    console.log('Result update ', result)
    return oferta
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos al actualizar la oferta')
  }
}
export const getOfertasToProveedorDashboardDao: Dao<Types.ObjectId, ErrorResponse|Array<DocType<Pick<Oferta, 'licitacion' | 'createdAt' | 'updatedAt'>> & {licitacion: Pick<Licitacion, 'participantes'| 'empresa'|'fechaInicio'>}>> = async (idProveedor) => {
  try {
    const ofertas = await OfertaModel.find({ proveedor: idProveedor }).select('licitacion createdAt updatedAt').populate<{licitacion: Pick<Licitacion, 'participantes'| 'empresa'|'fechaInicio'>}>('licitacion').select('fechaInicio empresa') as Array<DocType<Pick<Oferta, 'licitacion' | 'createdAt' | 'updatedAt'>> & {licitacion: Pick<Licitacion, 'participantes'| 'empresa'|'fechaInicio'>}>
    console.log('ofertas', ofertas)
    return ofertas
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al obtener las ofertas en la capa de datos')
  }
}
