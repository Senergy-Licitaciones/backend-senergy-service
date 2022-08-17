import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { getPuntoSumService, addPuntoSumService } from '../../services/puntoSum'
import { FieldsAdd } from '../../types/form'

export const getPuntoSum: RequestHandler = async (_req, res) => {
  try {
    const result = await getPuntoSumService()
    return res.status(200).send(result)
  } catch (err) {
    return httpError(res, err)
  }
}
export const addPuntoSum: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as FieldsAdd
    const response = await addPuntoSumService(fields)
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
