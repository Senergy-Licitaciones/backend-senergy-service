import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { loginUsuarioService, loginProveedorService, logoutUserService, confirmProveedorService, logoutProveedorService, loginAdminService } from '../../services/auth'
import { DocType, Proveedor, User } from '../../types/data'
import { ConfirmProveedor, LoginFields } from '../../types/form'

/* export const registerUsuario: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as UserRegisterFields
    const result = await registrarUsuarioService(fields)
    return res.status(200).send(result)
  } catch (err) {
    return httpError(res, err)
  }
} */
/* export const registerProveedor: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as ProveedorRegisterFields
    const result = await registrarProveedorService(fields)
    if ('error' in result) return res.status(400).send(result)
    return res.status(200).send(result)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
} */
export const loginProveedor: RequestHandler = async (req, res) => {
  try {
    const fields = req.body
    const response = await loginProveedorService(fields)
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
export const loginUsuario: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as LoginFields
    const response = await loginUsuarioService(fields)
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
/* export const confirmAccount: RequestHandler = async (req, res) => {
  try {
    const fields = req.body
    const result = await confirmAccountService(fields)
    return res.status(200).send(result)
  } catch (err) {
    return httpError(res, err)
  }
} */
export const logoutUsuario: RequestHandler = async (req, res) => {
  try {
    const user = req.user as DocType<User>
    const response = await logoutUserService(user._id)
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
export const confirmProveedorAccount: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as ConfirmProveedor
    const response = await confirmProveedorService(fields)
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
export const logoutProveedor: RequestHandler = async (req, res) => {
  try {
    const proveedor = req.proveedor as DocType<Proveedor>
    const response = await logoutProveedorService(proveedor._id)
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
export const loginAdmin: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as LoginFields
    const response = await loginAdminService(fields)
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
