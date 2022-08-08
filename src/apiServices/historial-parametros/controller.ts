import { RequestHandler, RequestParamHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { addParametrosService, exportFileService } from '../../services/historial-parametros'
import { Admin, DocType, ExportFileAdminData } from '../../types/data'

/* export const addParametro: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as {name: Parametro, unidad: Unidad, valor: number, fecha: string}
    const response = await addParametroService(fields)
    if ('error' in response) return res.status(400).send(response)
    return res.status(200).send(response)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
} */
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
export const getFilename: RequestParamHandler = (req, _res, next, filename) => {
  req.filename = filename
  return next()
}
export const downloadFile: RequestHandler = async (req, res) => {
  try {
    const filename = req.filename
    if (filename == null) return res.status(400).send({ message: 'No se encontró el archivo' })
    return res.status(200).download(`uploads/files/admin/${filename}`)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}

export const addParametros: RequestHandler = async (req, res) => {
  try {
    const file = req.file
    console.log('iniciando request')
    if (file == null) return res.status(400).send({ message: 'No se ha subido ningún archivo' })
    const path = 'uploads/files/admin/base-de-datos-factores-62b9e2eb9c0a4a5c9d052131.xlsx'
    const response = await addParametrosService({ filename: path })
    if ('error' in response) return res.status(400).send(response)
    console.log('antes del response')
    return res.status(200).send(response)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
