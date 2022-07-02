import { handleError } from '../../helpers/handleError'
import ProveedorModel from '../../apiServices/proveedor/model'
import { DaoProveedorRegister, InfoBasicaProveedor, ProveedorRegisterFields } from '../../types/form'
import { DocType, ErrorResponse, Proveedor, ResponseParent } from '../../types/data'
import { Document, Types, UpdateQuery } from 'mongoose'
import { Dao, DaoWithoutParam } from '../../types/methods'
import { Estado } from '../../types/data/enums'
export const crearProveedorDao: Dao<DaoProveedorRegister, ErrorResponse|Document<any, any, Proveedor> & Proveedor & {
  _id: Types.ObjectId}> = async (fields) => {
  try {
    const response = await ProveedorModel.create({ ...fields })
    const proveedor = await response.save()
    return proveedor
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos')
  }
}
export const getProveedorNameByIdDao: Dao<Types.ObjectId, {razSocial: string, ruc: number}|ErrorResponse> = async (id) => {
  try {
    const proveedor = await ProveedorModel.findById(id).select('razSocial ruc')
    if (proveedor == null) throw new Error('Proveedor no encontrado')
    return {
      razSocial: proveedor.razSocial,
      ruc: proveedor.ruc
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos al obtener el nombre del proveedor')
  }
}
export const updateProveedorDao: Dao<{fields: UpdateQuery<Partial<Proveedor>>, id: Types.ObjectId}, ErrorResponse|Document<any, any, Proveedor> & Proveedor & {
  _id: Types.ObjectId}> = async ({ fields, id }) => {
  try {
    const result = await ProveedorModel.findByIdAndUpdate(id, { ...fields }, { new: true })
    if (result == null) throw new Error('Cuenta inexistente')
    return result
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos')
  }
}
export const verifyCorreoProveedorDao: Dao<string, ErrorResponse|ResponseParent> = async (correo) => {
  try {
    const response = await ProveedorModel.findOne({ correo })
    if (response != null) throw new Error('Correo ya usado')
    return {
      message: 'Correo disponible'
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al verificar el correo')
  }
}
export const confirmProveedorDao: Dao<string, ErrorResponse|Document<any, any, Proveedor> & Proveedor & {
  _id: Types.ObjectId}> = async (idCode: string) => {
  try {
    const response = await ProveedorModel.findOneAndUpdate({
      codeToConfirm: idCode,
      verified: false
    }, {
      codeToConfirm: null,
      verified: true
    }, { new: true })
    if (response == null) throw new Error('No se pudo encontrar la cuenta a confirmar')
    return response
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la actualizacion del proveedor')
  }
}
export const proveedorEstadoDao: Dao<string, ErrorResponse|DocType<Proveedor>> = async (correo) => {
  try {
    const proveedor = await ProveedorModel.findOne({ correo, verified: true, estado: Estado.Offline })
    if (proveedor == null) throw new Error('Los datos son inválidos')
    return proveedor
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al verificar la cuenta')
  }
}
export const getProveedoresDao: DaoWithoutParam<ErrorResponse|Array<Document<any, any, Proveedor> & Proveedor & {
  _id: Types.ObjectId}>> = async () => {
  try {
    const proveedores = await ProveedorModel.find()
    return proveedores
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos al listar los proveedores')
  }
}
export const getProveedoresToUserDao: DaoWithoutParam<ErrorResponse|InfoBasicaProveedor[]> = async () => {
  try {
    const proveedores = await ProveedorModel.find().select('correo address phone razSocial ruc web') as InfoBasicaProveedor[]
    return proveedores
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al obtener los proveedores en la capa de datos')
  }
}
export const createProveedorDao: Dao<ProveedorRegisterFields, ErrorResponse|DocType<Proveedor>> = async (fields) => {
  try {
    const proveedor = await ProveedorModel.create(fields)
    const response = await proveedor.save()
    return response
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al crear el proveedor de energía eléctrica en la capa de datos')
  }
}
