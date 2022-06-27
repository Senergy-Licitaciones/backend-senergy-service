import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { createAdminService } from '../../services/admin'

export const createAdminUser: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as {name: string, correo: string, password: string}
    const response = await createAdminService(fields)
    if ('error' in response) return res.status(400).send(response)
    return res.status(200).send(response)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
