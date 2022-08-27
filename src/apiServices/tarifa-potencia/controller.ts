import { RequestHandler, RequestParamHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { addTarifasService, deleteTarifasService, exportFileTarifa, exportFileToUpdateService, getTarifasService, updateTarifaService, updateTarifasService } from '../../services/tarifa-potencia'
import { Admin, DocType, ExportFileAdminData } from '../../types/data'

export const exportFile: RequestHandler = async (req, res) => {
  try {
    const { _id } = req.admin as DocType<Admin>
    const { fechaInicio, fechaFin } = req.body as ExportFileAdminData
    const response = await exportFileTarifa({ fechaInicio, fechaFin, id: _id })
    return res.status(200).send(response)
  } catch (e) {
    return httpError(res, e)
  }
}
export const deleteTarifas: RequestHandler = async (_req, res) => {
  try {
    const response = await deleteTarifasService()
    return res.status(200).send(response)
  } catch (e) {
    return httpError(res, e)
  }
}
export const downloadFile: RequestHandler = async (req, res) => {
  try {
    const { filename } = req.params as {filename: string}
    if (filename == null) return res.status(400).send({ message: 'No se encontró el archivo' })
    return res.status(200).download(`uploads/files/admin/${filename}`)
  } catch (err) {
    return httpError(res, err)
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
export const addTarifas: RequestHandler = async (req, res) => {
  try {
    const file = req.file
    if (file == null) return res.status(400).send({ message: 'No se ha subido ningún archivo' })
    const path = 'uploads/files/admin/' + file.filename
    const response = await addTarifasService({ filename: path })
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
export const getFilename: RequestParamHandler = (req, _res, next, filename) => {
  req.filename = filename
  return next()
}
export const updateTarifas: RequestHandler = async (req, res) => {
  try {
    const file = req.file
    if (file == null) return res.status(400).send({ message: 'No se ha subido ningún archivo' })
    const path = `uploads/files/admin/${file.filename}`
    const response = await updateTarifasService({ path })
    console.log('antes del response')
    return res.status(200).send(response)
  } catch (e) {
    return httpError(res, e)
  }
}
export const updateTarifa: RequestHandler = async (req, res) => {
  try {
    const { idTarifa } = req.params
    const { value, fecha } = req.body as {value: number, fecha: string}
    const response = await updateTarifaService({ id: idTarifa, valor: value, fecha })
    return res.status(200).send(response)
  } catch (e) {
    return httpError(res, e)
  }
}
export const getTarifas: RequestHandler = async (_req, res) => {
  try {
    const tarifas = await getTarifasService()
    return res.status(200).send(tarifas)
  } catch (e) {
    return httpError(res, e)
  }
}
