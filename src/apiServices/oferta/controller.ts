import { RequestHandler, RequestParamHandler } from 'express'
import { Types } from 'mongoose'
import { httpError } from '../../helpers/handleError'
import { getOfertasService, getOfertaByIdService, updateOfertaService } from '../../services/oferta'
import { DocType, Oferta, Proveedor } from '../../types/data'

export const getOfertas: RequestHandler = async (req, res) => {
  try {
    const proveedor = req.proveedor as DocType<Proveedor>
    const ofertas = await getOfertasService(proveedor._id)
    return res.status(200).send(ofertas)
  } catch (err) {
    return httpError(res, err)
  }
}
export const getOfertaById: RequestHandler = async (req, res) => {
  try {
    const ofertaId = req.ofertaId as Types.ObjectId
    const oferta = await getOfertaByIdService(ofertaId)
    return res.status(200).send(oferta)
  } catch (err) {
    return httpError(res, err)
  }
}
export const ofertaId: RequestParamHandler = (req, _res, next, id) => {
  req.ofertaId = id
  next()
}
export const updateOferta: RequestHandler = async (req, res) => {
  try {
    const ofertaId = req.ofertaId as Types.ObjectId
    const fields = req.body as Partial<Oferta>
    const response = await updateOfertaService({ ofertaId, fields })
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
