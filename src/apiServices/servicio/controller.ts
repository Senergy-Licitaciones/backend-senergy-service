import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { getServiciosService, addServicioService } from '../../services/servicio'
import { FieldsAdd } from '../../types/form'

export const getServicios: RequestHandler = async (_req, res) => {
  try {
    const result = await getServiciosService()
    return res.status(200).send(result)
  } catch (err) {
    return httpError(res, err)
  }
}
export const addServicio: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as FieldsAdd
    const response = await addServicioService(fields)
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
