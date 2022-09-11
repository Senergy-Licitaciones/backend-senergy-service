import { RequestHandler, RequestParamHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { addParametrosService, deleteParametrosService, exportFileService, exportFileToUpdateService, exportProyeccionFileService, getNamesService, getParametrosService, updateParametroService, updateParametrosService } from '../../services/historial-parametros'
import { getDatesFromLicitacion } from '../../services/licitacion'
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
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
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
    return httpError(res, err)
  }
}

export const addParametros: RequestHandler = async (req, res) => {
  try {
    const file = req.file
    console.log('iniciando request')
    if (file == null) return res.status(400).send({ message: 'No se ha subido ningún archivo' })
    const path = 'uploads/files/admin/' + file.filename
    const response = await addParametrosService({ filename: path })
    console.log('antes del response')
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
export const updateParametros: RequestHandler = async (req, res) => {
  try {
    const file = req.file
    console.log('iniciando request')
    if (file == null) return res.status(400).send({ message: 'No se ha subido ningún archivo' })
    const path = `uploads/files/admin/${file.filename}`
    const response = await updateParametrosService({ path })
    console.log('antes del response')
    return res.status(200).send(response)
  } catch (e) {
    return httpError(res, e)
  }
}
export const exportFileToUpdate: RequestHandler = async (req, res) => {
  try {
    const { _id } = req.admin as DocType<Admin>
    const response = await exportFileToUpdateService({ id: _id })
    return res.status(200).send(response)
  } catch (e) {
    return httpError(res, e)
  }
}
export const getParametros: RequestHandler = async (_req, res) => {
  try {
    const parametros = await getParametrosService()
    return res.status(200).send(parametros)
  } catch (e) {
    return httpError(res, e)
  }
}
export const deleteParametros: RequestHandler = async (_req, res) => {
  try {
    const response = await deleteParametrosService()
    return res.status(200).send(response)
  } catch (e) {
    return httpError(res, e)
  }
}
export const updateParametro: RequestHandler = async (req, res) => {
  try {
    const { idParametro } = req.params
    const { value, fecha } = req.body as {value: number, fecha: string}
    const response = await updateParametroService({ id: idParametro, valor: value, fecha })
    return res.status(200).send(response)
  } catch (e) {
    return httpError(res, e)
  }
}
export const getNames: RequestHandler = async (_req, res) => {
  try {
    const parametros = await getNamesService()
    return res.status(200).send(parametros)
  } catch (e) {
    return httpError(res, e)
  }
}
export const exportProyeccionFile: RequestHandler = async (req, res) => {
  try {
    const { _id } = req.admin as DocType<Admin>
    const { idLicitacion } = req.params as any
    const { fechaInicio, fechaFin } = await getDatesFromLicitacion(idLicitacion)
    const response = await exportProyeccionFileService({ fechaInicio, fechaFin, idAdmin: _id, idLicitacion })
    return res.status(200).send(response)
  } catch (e) {
    return httpError(res, e)
  }
}
