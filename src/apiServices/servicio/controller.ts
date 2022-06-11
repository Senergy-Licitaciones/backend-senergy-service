import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { getServiciosService, addServicioService } from '../../services/servicio'
import { FieldsAdd } from '../../types/form'

export const getServicios: RequestHandler = async (_req, res) => {
  try {
    const result = await getServiciosService()
    if ('error' in result) return res.status(400).send(result)
    return res.status(200).send(result)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
export const addServicio: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as FieldsAdd
    const response = await addServicioService(fields)
    if ('error' in response) return res.status(400).send(response)
    return res.status(200).send(response)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
