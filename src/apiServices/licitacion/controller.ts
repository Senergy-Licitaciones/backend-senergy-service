import { httpError } from '../../helpers/handleError'
import { mostrarLicitacionesService, crearLicitacionService, updateLicitacionService, getTiposService, getLicitacionesFreeService, getLicitacionByIdService, getLicitacionesToAdmin, calculoExcel, calculoFormulaConstante } from '../../services/licitacion'
// import { formatFileLicitacion } from "../../utils/nameFormat";
// import fs from "fs";
// import { sendEmails } from "../../services/emails";
import { RequestHandler, RequestParamHandler } from 'express'
import { LicitacionRegisterFields } from '../../types/form'
import { DocType, Licitacion, Proveedor, User } from '../../types/data'
import { Types } from 'mongoose'
export const showLicitaciones: RequestHandler = async (_req, res) => {
  try {
    const result = await mostrarLicitacionesService()
    return res.status(200).send(result)
  } catch (err) {
    return httpError(res, err)
  }
}
export const createLicitacion: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as LicitacionRegisterFields
    const result = await crearLicitacionService(fields)
    return res.status(200).send(result)
  } catch (err) {
    return httpError(res, err)
  }
}
export const updateLicitacion: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as Partial<Licitacion>
    const id = req.licitacionId as Types.ObjectId
    const result = await updateLicitacionService({ fields, id })
    return res.status(200).send(result)
  } catch (err) {
    return httpError(res, err)
  }
}
export const getTipos: RequestHandler = async (req, res) => {
  try {
    const user = req.user as DocType<User>
    const result = await getTiposService(user._id)
    return res.status(200).send(result)
  } catch (err) {
    return httpError(res, err)
  }
}
export const showLicitacionesFree: RequestHandler = async (req, res) => {
  try {
    const proveedor = req.proveedor as DocType<Proveedor>
    const licitaciones = await getLicitacionesFreeService(proveedor._id)
    return res.status(200).send(licitaciones)
  } catch (err) {
    return httpError(res, err)
  }
}
export const showLicitacionById: RequestHandler = async (req, res) => {
  try {
    const licitacionId = req.licitacionId as Types.ObjectId
    const licitacion = await getLicitacionByIdService(licitacionId)
    return res.status(200).send(licitacion)
  } catch (err) {
    return httpError(res, err)
  }
}
export const licitacionId: RequestParamHandler = (req, _res, next, id) => {
  req.licitacionId = id
  next()
}
export const getLicitaciones: RequestHandler = async (_req, res) => {
  try {
    const licitaciones = await getLicitacionesToAdmin()
    return res.status(200).send(licitaciones)
  } catch (e) {
    return httpError(res, e)
  }
}
export const makeCalculo: RequestHandler = async (req, res) => {
  try {
    const licitacionId = req.licitacionId
    if (licitacionId == null) throw new Error('No se proporcionó la licitación')
    // const response = await calculoSimple(licitacionId)
    const response = await calculoFormulaConstante(licitacionId)
    return res.status(200).send(response)
  } catch (e) {
    return httpError(res, e)
  }
}
export const makeCalculoExcel: RequestHandler = async (req, res) => {
  try {
    const licitacionId = req.licitacionId
    const file = req.file
    if (licitacionId == null) throw new Error('No se proporcionó la licitación')
    if (file == null) return res.status(400).send({ message: 'No se ha subido ningún archivo' })
    const path = 'uploads/files/admin/' + file.filename
    const response = await calculoExcel({ idLicitacion: licitacionId, filename: path })
    return res.status(200).send(response)
  } catch (e) {
    return httpError(res, e)
  }
}
