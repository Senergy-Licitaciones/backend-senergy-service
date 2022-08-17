import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { getBrgService, addBrgService } from '../../services/brg'
import { FieldsAdd } from '../../types/form'

export const getBrg: RequestHandler = async (_req, res) => {
  try {
    const result = await getBrgService()
    return res.status(200).send(result)
  } catch (err) {
    return httpError(res, err)
  }
}
export const addBrg: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as FieldsAdd
    const response = await addBrgService(fields)
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
