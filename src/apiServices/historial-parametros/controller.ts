import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { addParametroService } from '../../services/historial-parametros'
import { Parametro, Unidad } from '../../types/data/enums'

export const addParametro: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as {name: Parametro, unidad: Unidad, valor: number, fecha: string}
    const response = await addParametroService(fields)
    if ('error' in response) return res.status(400).send(response)
    return res.status(200).send(response)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
