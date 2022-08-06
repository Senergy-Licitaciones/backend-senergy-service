import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { addParametroService, exportFileService } from '../../services/historial-parametros'
import { Admin, DocType, ExportFileAdminData } from '../../types/data'
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
export const exportFile: RequestHandler = async (req, res) => {
  try {
    const { _id } = req.admin as DocType<Admin>
    const { fechaInicio, fechaFin } = req.body as ExportFileAdminData
    const response = await exportFileService({ fechaInicio, fechaFin, id: _id })
    if ('error' in response) return res.status(400).send(response)
    return res.status(200).send(response)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
