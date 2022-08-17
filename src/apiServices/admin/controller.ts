import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { createAdminService, deleteAdminService, getAdminsService, updateAdminService } from '../../services/admin'
import { Admin } from '../../types/data'
import { RoleAdmin } from '../../types/data/enums'

export const createAdminUser: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as {name: string, correo: string, password: string, role: RoleAdmin}
    const response = await createAdminService(fields)
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
export const getAdmins: RequestHandler = async (_req, res) => {
  try {
    const admins = await getAdminsService()
    return res.status(200).send(admins)
  } catch (err) {
    return httpError(res, err)
  }
}
export const deleteAdmin: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id
    const response = await deleteAdminService(id)
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
export const updateAdmin: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as Partial<Admin>
    const id = req.params.id
    const response = await updateAdminService({ fields, id })
    return res.status(200).send(response)
  } catch (e) {
    return httpError(res, e)
  }
}
