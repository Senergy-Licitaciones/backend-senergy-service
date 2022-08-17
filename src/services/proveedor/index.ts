import { Types } from 'mongoose'
import { getLicitacionesToProveedorDashboardDao, updateLicitacionDao } from '../../dao/licitacion'
import { crearOfertaDao, getOfertasToProveedorDashboardDao } from '../../dao/oferta'
import { updateProveedorDao, getProveedoresDao, createProveedorDao, getProveedoresToUserDao } from '../../dao/proveedor'
import { encrypt } from '../../helpers/handleBcrypt'
import { handleError } from '../../helpers/handleError'
import { DocType, InfoDashboardProveedor, OfertaData, Proveedor, ResponseParent } from '../../types/data'
import { InfoBasicaProveedor, ProveedorRegisterFields } from '../../types/form'
import { Service, ServiceWithoutParam } from '../../types/methods'
import calcTime from '../../utils/calcTime'
import { formatFromStringToDate } from '../../utils/dateFormat'
export const getProveedoresToUserService: ServiceWithoutParam<InfoBasicaProveedor[]> = async () => {
  try {
    const proveedores = await getProveedoresToUserDao()
    return proveedores
  } catch (err) {
    throw handleError(err)
  }
}

export const participarLicitacionService: Service<{fields: OfertaData, idProveedor: Types.ObjectId}, ResponseParent> = async ({ fields, idProveedor }) => {
  try {
    const { potencia, energiaHp, energiaHfp, potenciaFacturar, formulaIndexPotencia, formulaIndexEnergia, potMinFacturable, licitacion, excesoPotencia, excesoEnergiaHp, excesoEnergiaHfp, tarifaEnergiaHfp, tarifaPotencia, tarifaEnergiaHp } = fields

    await crearOfertaDao({
      potencia,
      energiaHfp,
      energiaHp,
      potenciaFacturar,
      formulaIndexPotencia,
      formulaIndexEnergia,
      potMinFacturable,
      excesoPotencia,
      proveedor: idProveedor,
      licitacion,
      excesoEnergiaHp,
      excesoEnergiaHfp,
      tarifaPotencia,
      tarifaEnergiaHfp,
      tarifaEnergiaHp
    })
    await updateLicitacionDao({ fields: { $push: { participantes: idProveedor } }, id: licitacion })
    await updateProveedorDao({ fields: { $push: { licitaciones: licitacion } }, id: idProveedor })
    return {
      message: 'Se ha inscrito en la licitación exitosamente'
    }
  } catch (err) {
    throw handleError(err)
  }
}
export const getInfoDashboardProveedorService: Service<DocType<Proveedor>, InfoDashboardProveedor> = async (proveedor) => {
  try {
    const licitaciones = await getLicitacionesToProveedorDashboardDao(proveedor._id)
    if (licitaciones.length === 0) {
      return {
        numOfertas: 0,
        numLicitaciones: 0,
        plan: proveedor.role,
        timeToExpireLic: 'No existen licitaciones',
        ofertas: [],
        licitaciones: []
      }
    }
    const fechaActual = new Date(Date.now())
    const licitacionToExpire = licitaciones.reduce((prev, current) => {
      const currentDate = formatFromStringToDate(current.fechaFinApertura)
      const prevDate = formatFromStringToDate(prev.fechaFinApertura)
      return currentDate.getTime() - fechaActual.getTime() < prevDate.getTime() - fechaActual.getTime() ? current : prev
    })
    console.log('licitacionToExpire', licitacionToExpire)
    const ofertas = await getOfertasToProveedorDashboardDao(proveedor._id)
    return {
      numOfertas: proveedor.licitaciones.length,
      numLicitaciones: licitaciones.length,
      plan: proveedor.role,
      timeToExpireLic: calcTime(formatFromStringToDate(licitacionToExpire.fechaFinApertura), fechaActual),
      ofertas: ofertas.map((el) => ({ participantes: el.licitacion.participantes.length, fechaInicio: el.createdAt, fechaFin: formatFromStringToDate(el.licitacion.fechaInicio), empresa: el.licitacion.empresa })),
      licitaciones: licitaciones.map((li) => ({ fechaInicioApertura: formatFromStringToDate(li.fechaInicioApertura), fechaFinApertura: formatFromStringToDate(li.fechaFinApertura), empresa: li.empresa, participantes: li.participantes.length }))
    }
  } catch (err) {
    throw handleError(err)
  }
}
export const getProveedoresService: ServiceWithoutParam<Array<DocType<Pick<Proveedor, 'razSocial'|'ruc'|'role'|'phone1'|'correo'|'createdAt'|'updatedAt'>>>> = async () => {
  try {
    const proveedores = await getProveedoresDao()
    return proveedores
  } catch (err) {
    throw handleError(err)
  }
}
export const createProveedorService: Service<ProveedorRegisterFields, ResponseParent> = async (fields) => {
  try {
    const hash = await encrypt(fields.password)
    const proveedor = await createProveedorDao({ ...fields, password: hash })
    return {
      message: `Cuenta ${proveedor.correo} registrada exitosamente`
    }
  } catch (err) {
    throw handleError(err)
  }
}
