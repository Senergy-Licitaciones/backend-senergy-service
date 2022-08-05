import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { participarLicitacionService, getProveedoresService, getProveedoresToUserService, getInfoDashboardProveedorService, createProveedorService } from '../../services/proveedor'
import { DocType, OfertaData, Proveedor } from '../../types/data'
import { ProveedorRegisterFields } from '../../types/form'
export const getInfoDashboardProveedor: RequestHandler = async (req, res) => {
  try {
    const proveedor = req.proveedor as DocType<Proveedor>
    const info = await getInfoDashboardProveedorService(proveedor)
    if ('error' in info) return res.status(400).send(info)
    return res.status(200).send(info)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
export const getProveedoresToUser: RequestHandler = async (_req, res) => {
  try {
    const proveedores = await getProveedoresToUserService()
    if ('error' in proveedores) return res.status(400).send(proveedores)
    return res.status(200).send(proveedores)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
export const participarLicitacion: RequestHandler = async (req, res) => {
  try {
    const proveedor = req.proveedor as DocType<Proveedor>
    const fields = req.body as OfertaData
    const result = await participarLicitacionService({ fields, idProveedor: proveedor._id })
    if ('error' in result) return res.status(400).send(result)
    return res.status(200).send(result)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
export const showProveedores: RequestHandler = async (_req, res) => {
  try {
    const proveedores = await getProveedoresService()
    if ('error' in proveedores) return res.status(400).send(proveedores)
    return res.status(200).send(proveedores)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
export const createProveedor: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as ProveedorRegisterFields
    const response = await createProveedorService(fields)
    if ('error' in response) return res.status(400).send(response)
    return res.status(200).send(response)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
}
