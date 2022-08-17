import { Types } from 'mongoose'
import { showLicitacionesDao, createLicitacionDao, updateLicitacionDao, getTiposDao, getLicitacionesFreeDao, getLicitacionByIdDao, getLicitacionesToAdminDao } from '../../dao/licitacion'
import { handleError } from '../../helpers/handleError'
import { DocType, Licitacion, ResponseParent } from '../../types/data'
import { LicitacionRegisterFields } from '../../types/form'
import { Service, ServiceWithoutParam } from '../../types/methods'
import { LicitacionToAdmin } from '../../types/responses'

export const mostrarLicitacionesService: ServiceWithoutParam<Array<DocType<Licitacion>>> = async () => {
  try {
    const result = await showLicitacionesDao()
    return result
  } catch (err) {
    throw handleError(err)
  }
}
export const crearLicitacionService: Service<LicitacionRegisterFields, ResponseParent> = async (fields: LicitacionRegisterFields) => {
  try {
    const { title, description, tipoServicio, numLicitacion, requisitos, estado, empresa, fechaInicioApertura, fechaFinApertura, fechaInicio, puntoSum, brg, factorPlanta, meses, fechaFin, usuario, author } = fields
    await createLicitacionDao({ title, description, tipoServicio, numLicitacion, requisitos, estado, empresa, fechaInicioApertura, fechaFinApertura, fechaInicio, puntoSum, brg, factorPlanta, meses, fechaFin, usuario, author })
    return {
      message: 'Licitación creada exitosamente'
    }
  } catch (err) {
    console.log('error ', err)
    throw handleError(err)
  }
}
export const updateLicitacionService: Service<{fields: Partial<Licitacion>, id: Types.ObjectId}, ResponseParent> = async ({ fields, id }) => {
  try {
    const result = await updateLicitacionDao({ fields, id })
    return {
      message: result.message
    }
  } catch (err) {
    throw handleError(err)
  }
}
export const getTiposService: Service<string, Array<DocType<Licitacion>>> = async (id) => {
  try {
    const result = await getTiposDao(id)
    return result
  } catch (err) {
    throw handleError(err)
  }
}
export const getLicitacionesFreeService: Service<Types.ObjectId, Array<DocType<Licitacion>>> = async (proveedorId) => {
  try {
    const licitaciones = await getLicitacionesFreeDao(proveedorId)
    return licitaciones
  } catch (err) {
    throw handleError(err)
  }
}
export const getLicitacionByIdService: Service<Types.ObjectId, DocType<Licitacion>> = async (id) => {
  try {
    const licitacion = await getLicitacionByIdDao(id)
    return licitacion
  } catch (err) {
    throw handleError(err)
  }
}
export const getLicitacionesToAdmin: ServiceWithoutParam<LicitacionToAdmin[]> = async () => {
  try {
    const licitaciones = await getLicitacionesToAdminDao()
    return licitaciones
  } catch (e) {
    throw handleError(e)
  }
}
