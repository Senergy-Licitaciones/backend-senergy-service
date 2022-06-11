import { RequestHandler } from 'express'
import { httpError } from '../../helpers/handleError'
import { participarLicitacionService, getProveedoresService } from '../../services/proveedor'
import { DocType, Oferta, Proveedor } from '../../types/data'

export const participarLicitacion: RequestHandler = async (req, res) => {
  try {
    const proveedor = req.proveedor as DocType<Proveedor>
    const fields = req.body as Oferta
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
