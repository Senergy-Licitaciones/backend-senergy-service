import { handleError } from '../../helpers/handleError'
import UsuarioModel from '../../apiServices/usuario/model'
import { DocType, ResponseId, ResponseParent, User } from '../../types/data'
import { UserRegisterFields } from '../../types/form'
import { Types } from 'mongoose'
import { Dao, DaoWithoutParam } from '../../types/methods'
import { Estado, Role } from '../../types/data/enums'
export const crearUsuarioDao: Dao<UserRegisterFields, DocType<User>> = async (fields) => {
  try {
    const user = await UsuarioModel.create({ ...fields })
    const response = await user.save()
    return response
  } catch (err) {
    console.log('error crear user dao ', err)
    throw handleError(err, 'Ha ocurrido un error al registrar un nuevo usuario')
  }
}
export const verifyCorreoDao: Dao<string, ResponseParent|ResponseId> = async (correo) => {
  try {
    const result = await UsuarioModel.findOne({ correo })
    if (result != null) return { message: 'Correo ya usado', _id: result._id }
    return {
      message: 'Correo disponible'
    }
  } catch (err) {
    console.log('usuario dao ', err)
    throw handleError(err, 'Ha ocurrido un error al verificar el correo')
  }
}
export const updateUsuarioDao: Dao<{fields: Partial<User>, id: Types.ObjectId}, ResponseParent> = async ({ fields, id }) => {
  try {
    const result = await UsuarioModel.findByIdAndUpdate(id, { ...fields }, { new: true })
    if (result == null) throw new Error('Usuario no encontrado')
    return {
      message: `Usuario ${result.correo} actualizado correctamente`
    }
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al actualizar el usuario')
  }
}
export const confirmUserDao: Dao<string, ResponseParent> = async (idUser) => {
  try {
    const response = await UsuarioModel.findByIdAndUpdate(idUser, { estado: Estado.Offline })
    if (response == null) throw new Error('Usuario no encontrado')
    return {
      message: 'Cuenta confirmada exitosamente'
    }
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error en la capa de datos')
  }
}
export const getUserHashDao: Dao<string, DocType<User>> = async (correo) => {
  try {
    const response = await UsuarioModel.findOne({ correo }).select('password role correo empresa')
    if (response == null) throw new Error('Correo no registrado')
    return response
  } catch (err) {
    console.log('error en datos', err)
    throw handleError(err, 'Ha ocurrido un error en la capa de datos')
  }
}
/* export const getUserDao: Dao<string, ErrorResponse|DocType<User>> = async (correo) => {
  try {
    const user = await UsuarioModel.findOne({ correo, role: Role.Admin })
    if (user == null) throw new Error('Usuario no encontrado')
    return user
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de datos al encontrar el usuario')
  }
} */
export const getUsersDao: DaoWithoutParam<Array<DocType<Pick<User, 'correo'| 'empresa' |'ruc' |'phone'| 'role'|'createdAt'|'updatedAt'>>>> = async () => {
  try {
    const users = await UsuarioModel.find().select('correo empresa ruc phone role createdAt updatedAt') as Array<DocType<Pick<User, 'updatedAt'|'createdAt'| 'correo'| 'empresa'| 'ruc' |'phone'| 'role'>>>
    return users
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error en la capa de datos al obtener la lista de usuarios')
  }
}
export const createUserDao: Dao<{empresa: string, address: string, correo: string, password: string, role: Role, web: string, phone: string, ruc: string}, {message: string}> = async (payload) => {
  try {
    const user = await UsuarioModel.create({ ...payload })
    const response = await user.save()
    console.log(response)
    return {
      message: 'Usuario creado correctamente'
    }
  } catch (e) {
    throw handleError(e, 'Ha ocurrido un error en la capa de datos al crear el usuario')
  }
}
