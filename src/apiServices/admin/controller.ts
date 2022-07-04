import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { createAdminService, getAdminsService } from '../../services/admin'
import { RoleAdmin } from '../../types/data/enums'

export const createAdminUser: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as {name: string, correo: string, password: string, role: RoleAdmin}
    const response = await createAdminService(fields)
    if ('error' in response) return res.status(400).send(response)
    return res.status(200).send(response)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
export const getAdmins: RequestHandler = async (_req, res) => {
  try {
    const admins = await getAdminsService()
    if ('error' in admins) return res.status(400).send(admins)
    return res.status(200).send(admins)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
