import { handleError } from '../../helpers/handleError'
import ProveedorModel from '../../apiServices/proveedor/model'
import { DaoProveedorRegister, ProveedorRegisterFields } from '../../types/form'
import { DocType, Proveedor, ResponseParent } from '../../types/data'
import { Document, Types, UpdateQuery } from 'mongoose'
import { Dao, DaoWithoutParam } from '../../types/methods'
export const crearProveedorDao: Dao<DaoProveedorRegister, Document<any, any, Proveedor> & Proveedor & {
  _id: Types.ObjectId}> = async (fields) => {
  try {
    const response = await ProveedorModel.create({ ...fields })
    const proveedor = await response.save()
    return proveedor
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al registrar un nuevo proveedor')
  }
}
export const getProveedoresToUserDao: DaoWithoutParam<Array<DocType<Pick<Proveedor, 'createdAt'|'updatedAt'|'correo' |'razSocial'|'ruc'|'web'|'address'|'phone1'>>>> = async () => {
  try {
    const response = await ProveedorModel.find().select('createdAt updatedAt correo razSocial ruc web address phone1') as Array<DocType<Pick<Proveedor, 'createdAt'|'updatedAt'|'correo' |'razSocial'|'ruc'|'web'|'address'|'phone1'>>>
    return response
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un error al obtener la información de los generadores')
  }
}
export const getProveedorNameByIdDao: Dao<Types.ObjectId, {razSocial: string, ruc: number}> = async (id) => {
  try {
    const proveedor = await ProveedorModel.findById(id).select('razSocial ruc')
    if (proveedor == null) throw new Error('Proveedor no encontrado')
    return {
      razSocial: proveedor.razSocial,
      ruc: proveedor.ruc
    }
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error en la capa de datos al obtener el nombre del proveedor')
  }
}
export const updateProveedorDao: Dao<{fields: UpdateQuery<Partial<Proveedor>>, id: Types.ObjectId}, Document<any, any, Proveedor> & Proveedor & {
  _id: Types.ObjectId}> = async ({ fields, id }) => {
  try {
    const result = await ProveedorModel.findByIdAndUpdate(id, { ...fields }, { new: true })
    if (result == null) throw new Error('Cuenta inexistente')
    return result
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al actualizar el proveedor')
  }
}
export const verifyCorreoProveedorDao: Dao<string, ResponseParent> = async (correo) => {
  try {
    const response = await ProveedorModel.findOne({ correo })
    if (response != null) throw new Error('Correo ya usado')
    return {
      message: 'Correo disponible'
    }
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al verificar el correo')
  }
}
export const confirmProveedorDao: Dao<string, Document<any, any, Proveedor> & Proveedor & {
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
    throw handleError(err, 'Ha ocurrido un error al confirmar la cuenta del proveedor')
  }
}
export const proveedorEstadoDao: Dao<string, DocType<Proveedor>> = async (correo) => {
  try {
    const proveedor = await ProveedorModel.findOne({ correo, verified: true /* estado: Estado.Offline */ })
    if (proveedor == null) throw new Error('Los datos son inválidos')
    return proveedor
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al verificar la cuenta')
  }
}
export const getProveedoresDao: DaoWithoutParam<Array<DocType<Pick<Proveedor, 'razSocial'|'ruc'|'role'|'createdAt'|'updatedAt'|'phone1'|'correo'>>>> = async () => {
  try {
    const proveedores = await ProveedorModel.find().select('razSocial ruc role createdAt updatedAt correo phone1') as Array<DocType<Pick<Proveedor, 'phone1'|'updatedAt'|'createdAt'| 'razSocial'|'ruc'|'role'|'correo'>>>
    return proveedores
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error en la capa de datos al listar los proveedores')
  }
}
export const createProveedorDao: Dao<ProveedorRegisterFields, DocType<Proveedor>> = async (fields) => {
  try {
    const proveedor = await ProveedorModel.create(fields)
    const response = await proveedor.save()
    return response
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al crear el proveedor de energía eléctrica en la capa de datos')
  }
}
