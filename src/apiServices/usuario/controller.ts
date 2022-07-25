import { RequestHandler, RequestParamHandler } from 'express'
import { Types } from 'mongoose'
import { httpError } from '../../helpers/handleError'
import { changeStatusService, generateFileToMonthsDetailsService, getInfoUserService, getLicitacionesByUser, getUsersService, validateFileService } from '../../services/usuario'
import { DocType, User } from '../../types/data'
import { Estado } from '../../types/form/enums'

export const changeStatus: RequestHandler = async (req, res) => {
  try {
    const { estado, idLicitacion } = req.body as {estado: Estado, idLicitacion: Types.ObjectId}
    const result = await changeStatusService({ status: estado, id: idLicitacion })
    if ('error' in result) return res.send(result)
    return res.status(200).send(result)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
export const showUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await getUsersService()
    if ('error' in users) return res.status(400).send(users)
    return res.status(200).send(users)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
export const showLicitaciones: RequestHandler = async (req, res) => {
  try {
    const user = req.user as DocType<User>
    const licitaciones = await getLicitacionesByUser(user._id)
    if ('error' in licitaciones) return res.status(400).send(licitaciones)
    return res.status(200).send(licitaciones)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
export const getInfoUser: RequestHandler = async (req, res) => {
  try {
    const user = req.user as DocType<User>
    const info = await getInfoUserService(user)
    if ('error' in info) return res.status(400).send(info)
    return res.status(200).send(info)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
export const generateFileToMonthsDetails: RequestHandler = async (req, res) => {
  try {
    const { meses } = req.body as {meses: Array<{mes: string, hp: number, hfp: number}>}
    const user = req.user as DocType<User>
    const result = generateFileToMonthsDetailsService(meses, user)
    if ('error' in result) return res.status(400).send(result)
    return res.status(200).send(result)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
export const filename: RequestParamHandler = (req, _res, next, filename) => {
  req.filename = filename
  next()
}
export const getEspecificacionMes: RequestHandler = async (req, res) => {
  try {
    if (req.filename == null) return res.status(400).send({ message: 'No se ha especificado el archivo' })
    return res.status(200).download(`uploads/files/especificacion-mes-ut1/${req.filename}`)
  } catch (err) {
    console.log(err)
    const error = err as Error
    return httpError(res, error)
  }
}
export const validateFile: RequestHandler = (req, res) => {
  try {
    const file = req.file
    if (file == null) return res.status(400).send({ message: 'No se ha subido ningún archivo' })
    const response = validateFileService(file.filename)
    if ('error' in response) return res.status(400).send(response)
    return res.status(200).send(response)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
