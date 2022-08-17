import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { participarLicitacionService, getProveedoresService, getProveedoresToUserService, getInfoDashboardProveedorService, createProveedorService } from '../../services/proveedor'
import { DocType, OfertaData, Proveedor } from '../../types/data'
import { ProveedorRegisterFields } from '../../types/form'
export const getInfoDashboardProveedor: RequestHandler = async (req, res) => {
  try {
    const proveedor = req.proveedor as DocType<Proveedor>
    const info = await getInfoDashboardProveedorService(proveedor)
    return res.status(200).send(info)
  } catch (err) {
    return httpError(res, err)
  }
}
export const getProveedoresToUser: RequestHandler = async (_req, res) => {
  try {
    const proveedores = await getProveedoresToUserService()
    return res.status(200).send(proveedores)
  } catch (err) {
    return httpError(res, err)
  }
}
export const participarLicitacion: RequestHandler = async (req, res) => {
  try {
    const proveedor = req.proveedor as DocType<Proveedor>
    const fields = req.body as OfertaData
    const result = await participarLicitacionService({ fields, idProveedor: proveedor._id })
    return res.status(200).send(result)
  } catch (err) {
    return httpError(res, err)
  }
}
export const showProveedores: RequestHandler = async (_req, res) => {
  try {
    const proveedores = await getProveedoresService()
    return res.status(200).send(proveedores)
  } catch (err) {
    return httpError(res, err)
  }
}
export const createProveedor: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as ProveedorRegisterFields
    const response = await createProveedorService(fields)
    return res.status(200).send(response)
  } catch (err) {
    return httpError(res, err)
  }
}
