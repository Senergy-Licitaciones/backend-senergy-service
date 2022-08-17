import { ConfirmProveedor, LoginFields } from '../../types/form'
import { confirmCodeDao } from '../../dao/codeProveedor'
import { confirmProveedorDao, proveedorEstadoDao } from '../../dao/proveedor'
import { logoutUserDao } from '../../dao/sessionUser'
import { logoutProveedorDao } from '../../dao/sessionProveedor'
import { getUserHashDao } from '../../dao/usuario'
import { tokenSignUser, tokenSignProveedor, tokenSignAdmin } from '../../helpers/generateToken'
import { compare } from '../../helpers/handleBcrypt'
import { handleError } from '../../helpers/handleError'
import { Types } from 'mongoose'
import { Service } from '../../types/methods'
import { ResponseParent } from '../../types/data'
import { getAccountDao } from '../../dao/admin'

/* export const registrarUsuarioService: Service<UserRegisterFields, ResponseRegisterUser> = async (fields) => {
  try {
    const { correo, password, empresa, ruc, web = 'Sin Página Web', phone, address } = fields
    const isFree = await verifyCorreoDao(correo)
    if ('error' in isFree) return handleError(isFree.error, isFree.message)
    if ('_id' in isFree) {
      const result = await verifyCodeDao(isFree._id)
      if ('error' in result) return handleError(result.error, result.message)
      const code = generateCode()
      const response = await sendCodeVerification({ code, correo })
      if ('error' in response) return handleError(response.error, response.message)
      const resultCode = await createCodeDao({ code, user: isFree._id })
      if ('error' in resultCode) return handleError(resultCode.error, resultCode.message)
      return {
        idUser: isFree._id,
        message: 'Cuenta por confirmar'
      }
    }
    console.log('primer condicional ')
    const code = generateCode()
    const response = await sendCodeVerification({ code, correo })
    if ('error' in response) return handleError(response.error, response.message)
    const hash = await encrypt(password)
    if (typeof hash !== 'string') throw new Error(hash.message)
    const user = await crearUsuarioDao({ correo, password: hash, empresa, ruc, phone, address, web })
    if ('error' in user) return handleError(user.error, user.message)
    const resultCode = await createCodeDao({ code, user: user._id })
    if ('error' in resultCode) return handleError(resultCode.error, resultCode.message)
    return {
      idUser: user._id,
      message: 'Cuenta por confirmar'
    }
  } catch (err) {
    throw handleError(err)
  }
} */
/* export const confirmAccountService: Service<ConfirmAccount, ResponseParent|ErrorResponse> = async (fields) => {
  try {
    const { idUser, code } = fields
    const result = await removeCodeDao({ idUser, code })
    if ('error' in result) return handleError(result.error, result.message)
    const response = await confirmUserDao(idUser)
    if ('error' in response) return handleError(response.error, response.message)
    return {
      message: 'Cuenta confirmada exitosamente'
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios')
  }
} */
/* export const registrarProveedorService: Service<ProveedorRegisterFields, ErrorResponse|ResponseParent & {correo: string}> = async (fields) => {
  try {
    const exist = await verifyCorreoProveedorDao(fields.correo)
    if ('error' in exist) return handleError(exist.error, exist.message)
    const code = generateCode()
    const hash = await encrypt(fields.password)
    if (typeof hash !== 'string') throw new Error(hash.message)
    const response = await createCodeProveedorDao({ code, proveedor: fields.correo })
    if ('error' in response) return handleError(response.error, response.message)
    const proveedor = await crearProveedorDao({ ...fields, password: hash, codeToConfirm: response._id })
    if ('error' in proveedor) return handleError(proveedor.error, proveedor.message)
    const result = await sendCodeVerification({ code, correo: fields.correo })
    if ('error' in result) return handleError(result.error, result.message)
    return {
      message: 'Proveedor registrado esperando por confirmar',
      correo: proveedor.correo
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios')
  }
} */
export const loginProveedorService: Service<LoginFields, {message: string, token: string}> = async (fields) => {
  try {
    const proveedor = await proveedorEstadoDao(fields.correo)
    console.log('proveedor ', proveedor)
    const isCorrect = await compare({ password: fields.password, hash: proveedor.password })
    if (!isCorrect) throw new Error('La contraseña es incorrecta')
    const token = tokenSignProveedor(proveedor)
    /* const session = await createSessionProveedor({ proveedorId: proveedor._id, token })
    console.log('session ', session)
    if ('error' in session) return handleError(session.error, session.message)
    const response = await updateProveedorDao({ fields: { estado: Estado.Online, session: session._id }, id: proveedor._id })
    console.log('response ', response)
    if ('error' in response) return handleError(response.error, response.message) */
    return {
      message: 'Proveedor logeado exitosamente',
      token
    }
  } catch (err) {
    console.log('error ', err)
    throw handleError(err)
  }
}
export const loginUsuarioService: Service<LoginFields, ResponseParent&{token: string}> = async (fields) => {
  try {
    const { correo, password } = fields
    const user = await getUserHashDao(correo)
    const isCorrect = await compare({ password, hash: user.password })
    if (!isCorrect) throw new Error('La contraseña es incorrecta')
    const token = tokenSignUser(user)
    /* const result = await createSessionUser({ idUser: user._id, token })
    if ('error' in result) return handleError(result.error, result.message)
    console.log('session user ', result)
    const response = await updateUsuarioDao({ fields: { estado: Estado.Online, sessionId: result._id.toString() }, id: user._id })
    if ('error' in response) return handleError(response.error, response.message)
    console.log('update user ', response) */
    return {
      message: 'Usuario logeado exitosamente',
      token
    }
  } catch (err) {
    console.log('error catch service ', err)
    throw handleError(err)
  }
}
export const logoutUserService: Service<string, ResponseParent> = async (id) => {
  try {
    const response = await logoutUserDao(id)
    return response
  } catch (err) {
    throw handleError(err)
  }
}
export const confirmProveedorService: Service<ConfirmProveedor, ResponseParent> = async (fields) => {
  try {
    const { correo, code } = fields
    const response = await confirmCodeDao({ correo, code })
    const result = await confirmProveedorDao(response._id)
    console.log('response ', response, ' result ', result)
    await response.remove()
    return {
      message: 'Cuenta de proveeedor confirmado'
    }
  } catch (err) {
    throw handleError(err)
  }
}
export const logoutProveedorService: Service<Types.ObjectId, ResponseParent> = async (proveedorId) => {
  try {
    await logoutProveedorDao(proveedorId)
    return {
      message: 'Sesión cerrada exitosamente'
    }
  } catch (err) {
    throw handleError(err)
  }
}
export const loginAdminService: Service<LoginFields, ResponseParent&{token: string}> = async (fields) => {
  try {
    const { correo, password } = fields
    const admin = await getAccountDao(correo)
    const isCorrect = await compare({ password, hash: admin.password })
    if (!isCorrect) throw new Error('Contraseña incorrecta')
    const token = tokenSignAdmin(admin)
    return {
      message: 'Usuario admin logeado exitosamente',
      token
    }
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al iniciar sesión')
  }
}
