import { Types } from 'mongoose'
import { getLicitacionesToProveedorDashboardDao, updateLicitacionDao } from '../../dao/licitacion'
import { crearOfertaDao, getOfertasToProveedorDashboardDao } from '../../dao/oferta'
import { updateProveedorDao, getProveedoresDao, getProveedoresToUserDao, createProveedorDao } from '../../dao/proveedor'
import { handleError } from '../../helpers/handleError'
import { DocType, ErrorResponse, InfoDashboardProveedor, Oferta, Proveedor, ResponseParent } from '../../types/data'
import { InfoBasicaProveedor, ProveedorRegisterFields } from '../../types/form'
import { Service, ServiceWithoutParam } from '../../types/methods'
import calcTime from '../../utils/calcTime'
import { formatFromStringToDate } from '../../utils/dateFormat'
export const getProveedoresToUserService: ServiceWithoutParam<ErrorResponse|InfoBasicaProveedor[]> = async () => {
  try {
    const proveedores = await getProveedoresToUserDao()
    if ('error' in proveedores) return handleError(proveedores.error, proveedores.message)
    return proveedores
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al obtener los proveedores en la capa de servicios')
  }
}
export const participarLicitacionService: Service<{fields: Oferta, idProveedor: Types.ObjectId}, ErrorResponse|ResponseParent> = async ({ fields, idProveedor }) => {
  try {
    const { potencia, energiaHp, energiaHfp, potenciaFacturar, formulaIndexPotencia, formulaIndexEnergia, potMinFacturable, licitacion, excesoPotencia, excesoEnergiaHp, excesoEnergiaHfp } = fields
    const oferta = await crearOfertaDao({ potencia, energiaHfp, energiaHp, potenciaFacturar, formulaIndexPotencia, formulaIndexEnergia, potMinFacturable, excesoPotencia, proveedor: idProveedor, licitacion, excesoEnergiaHp, excesoEnergiaHfp })
    if ('error' in oferta) return handleError(oferta.error, oferta.message)
    const result = await updateLicitacionDao({ fields: { $push: { participantes: idProveedor } }, id: licitacion })
    if ('error' in result) return handleError(result.error, result.message)
    const proveedor = await updateProveedorDao({ fields: { $push: { licitaciones: licitacion } }, id: idProveedor })
    if ('error' in proveedor) return handleError(proveedor.error, proveedor.message)
    return {
      message: 'Se ha inscrito en la licitación exitosamente'
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios')
  }
}
export const getInfoDashboardProveedorService: Service<DocType<Proveedor>, ErrorResponse|InfoDashboardProveedor> = async (proveedor) => {
  try {
    const licitaciones = await getLicitacionesToProveedorDashboardDao(proveedor._id)
    if ('error' in licitaciones) throw new Error(licitaciones.message)
    const fechaActual = new Date(Date.now())
    const licitacionToExpire = licitaciones.reduce((prev, current) => {
      const currentDate = formatFromStringToDate(current.fechaFinApertura)
      const prevDate = formatFromStringToDate(prev.fechaFinApertura)
      return currentDate.getTime() - fechaActual.getTime() < prevDate.getTime() - fechaActual.getTime() ? current : prev
    })
    console.log('licitacionToExpire', licitacionToExpire)
    const ofertas = await getOfertasToProveedorDashboardDao(proveedor._id)
    if ('error' in ofertas) throw new Error(ofertas.message)
    return {
      numOfertas: proveedor.licitaciones.length,
      numLicitaciones: licitaciones.length,
      plan: proveedor.role,
      timeToExpireLic: calcTime(formatFromStringToDate(licitacionToExpire.fechaFinApertura), fechaActual),
      ofertas: ofertas.map((el) => ({ participantes: el.licitacion.participantes.length, fechaInicio: el.createdAt, fechaFin: formatFromStringToDate(el.licitacion.fechaInicio), empresa: el.licitacion.empresa })),
      licitaciones: licitaciones.map((li) => ({ fechaInicioApertura: formatFromStringToDate(li.fechaInicioApertura), fechaFinApertura: formatFromStringToDate(li.fechaFinApertura), empresa: li.empresa, participantes: li.participantes.length }))
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al obtener la información en la capa de servicios')
  }
}
export const getProveedoresService: ServiceWithoutParam<ErrorResponse|Array<DocType<Proveedor>>> = async () => {
  try {
    const proveedores = await getProveedoresDao()
    if ('error' in proveedores) return handleError(proveedores.error, proveedores.message)
    return proveedores
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios al listar los proveedores')
  }
}
export const createProveedorService: Service<ProveedorRegisterFields, ErrorResponse|ResponseParent> = async (fields) => {
  try {
    const proveedor = await createProveedorDao(fields)
    if ('error' in proveedor) throw new Error()
    return {
      message: `Cuenta ${proveedor.correo} registrada exitosamente`
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios al registrar un nuevo proveedor de electricidad')
  }
}
