import { Types } from 'mongoose'
import { getHistorialParametrosListDao } from '../../dao/historial-parametros'
import { showLicitacionesDao, createLicitacionDao, updateLicitacionDao, getTiposDao, getLicitacionesFreeDao, getLicitacionByIdDao, getLicitacionesToAdminDao } from '../../dao/licitacion'
import { getOfertasByLicitacionAndProveedorDao } from '../../dao/oferta'
import { handleError } from '../../helpers/handleError'
import { DocType, Licitacion, Oferta, Proveedor, ResponseParent } from '../../types/data'
import { LicitacionRegisterFields } from '../../types/form'
import { Service, ServiceWithoutParam } from '../../types/methods'
import { LicitacionToAdmin } from '../../types/responses'
import { calcularHistorico, calcularHistoricoEnergiaHfp, calcularHistoricoEnergiaHp, generateMesesArray } from '../../utils'

export const mostrarLicitacionesService: ServiceWithoutParam<Array<DocType<Licitacion>>> = async () => {
  try {
    const result = await showLicitacionesDao()
    return result
  } catch (err) {
    throw handleError(err)
  }
}
export const crearLicitacionService: Service<LicitacionRegisterFields, ResponseParent> = async (fields: LicitacionRegisterFields) => {
  try {
    const { title, description, tipoServicio, numLicitacion, requisitos, estado, empresa, fechaInicioApertura, fechaFinApertura, fechaInicio, puntoSum, brg, factorPlanta, meses, fechaFin, usuario, author } = fields
    await createLicitacionDao({ title, description, tipoServicio, numLicitacion, requisitos, estado, empresa, fechaInicioApertura, fechaFinApertura, fechaInicio, puntoSum, brg, factorPlanta, meses, fechaFin, usuario, author })
    return {
      message: 'Licitación creada exitosamente'
    }
  } catch (err) {
    console.log('error ', err)
    throw handleError(err)
  }
}
export const updateLicitacionService: Service<{fields: Partial<Licitacion>, id: Types.ObjectId}, ResponseParent> = async ({ fields, id }) => {
  try {
    const result = await updateLicitacionDao({ fields, id })
    return {
      message: result.message
    }
  } catch (err) {
    throw handleError(err)
  }
}
export const getTiposService: Service<string, Array<DocType<Licitacion>>> = async (id) => {
  try {
    const result = await getTiposDao(id)
    return result
  } catch (err) {
    throw handleError(err)
  }
}
export const getLicitacionesFreeService: Service<Types.ObjectId, Array<DocType<Licitacion>>> = async (proveedorId) => {
  try {
    const licitaciones = await getLicitacionesFreeDao(proveedorId)
    return licitaciones
  } catch (err) {
    throw handleError(err)
  }
}
export const getLicitacionByIdService: Service<Types.ObjectId, DocType<Licitacion>> = async (id) => {
  try {
    const licitacion = await getLicitacionByIdDao(id)
    return licitacion
  } catch (err) {
    throw handleError(err)
  }
}
export const getLicitacionesToAdmin: ServiceWithoutParam<LicitacionToAdmin[]> = async () => {
  try {
    const licitaciones = await getLicitacionesToAdminDao()
    return licitaciones
  } catch (e) {
    throw handleError(e)
  }
}
export const getOfertasByLicitacionService: Service<Types.ObjectId, Array<DocType<Oferta>&{proveedor: Pick<Proveedor, 'razSocial'>}>> = async (idLicitacion) => {
  try {
    const ofertas = await getOfertasByLicitacionAndProveedorDao({ licitacionId: idLicitacion })
    return ofertas
  } catch (e) {
    throw handleError(e)
  }
}
export const makeCalculoService: Service<Types.ObjectId, Array<{empresa: string, monomico: number[], potencia: number[], energiaHp: number[], energiaHfp: number[]}>> = async (id) => {
  try {
    const ofertas = await getOfertasByLicitacionAndProveedorDao({ licitacionId: id })
    console.log('ofertas ', ofertas)
    const parametros: string[] = []
    const historialOfertas: Array<{
      empresa: string
      monomico: number[]
      potencia: number[]
      energiaHp: number[]
      energiaHfp: number[]
    }> = ofertas.map((oferta) => {
      oferta.formulaIndexPotencia.map((formula) => {
        if (!parametros.includes(formula.indexId)) {
          parametros.push(formula.indexId)
        }
        return null
      })
      oferta.formulaIndexEnergia.map((formula) => {
        if (!parametros.includes(formula.indexId)) {
          parametros.push(formula.indexId)
        }
        return null
      })
      return {
        empresa: oferta.proveedor.razSocial,
        monomico: [],
        potencia: [],
        energiaHp: [],
        energiaHfp: []
      }
    })
    console.log('parametros ', parametros)
    const historicoParametros = await getHistorialParametrosListDao(parametros)
    console.log('historicoParametros ', historicoParametros)
    ofertas.map((oferta, i) => {
      // para potencia en bloques y más de dos factores de indexación
      const bloquesMesesPotencia = oferta.potencia.map((bloque) => {
        const meses = generateMesesArray(bloque.fechaInicio, bloque.fechaFin)
        return meses
      })
      console.log('bloques meses potencia ', bloquesMesesPotencia)
      const bloquesMesesEnergiaHp = oferta.energiaHp.map((bloque) => {
        const meses = generateMesesArray(bloque.fechaInicio, bloque.fechaFin)
        return meses
      })
      const bloquesMesesEnergiaHfp = oferta.energiaHfp.map((bloque) => {
        const meses = generateMesesArray(bloque.fechaInicio, bloque.fechaFin)
        return meses
      })
      console.log('bloques meses energia hp ', bloquesMesesEnergiaHp)
      historialOfertas[i].potencia = calcularHistorico(historicoParametros, bloquesMesesPotencia, oferta)
      console.log('first potencia ', historialOfertas[i].potencia)
      historialOfertas[i].energiaHp = calcularHistoricoEnergiaHp(historicoParametros, bloquesMesesEnergiaHp, oferta)
      console.log('first energia hp ', historialOfertas[i].energiaHp)
      historialOfertas[i].energiaHfp = calcularHistoricoEnergiaHfp(historicoParametros, bloquesMesesEnergiaHfp, oferta)
      console.log('first energia hfp ', historialOfertas[i].energiaHfp)
      historialOfertas[i].monomico = historialOfertas[i].potencia.map((value, j) => {
        const precioPotencia = value * 100 * 10 / (720 * 0.79751092507001)
        console.log('first precio potencia ', precioPotencia)
        const precioEnergia = (5 * historialOfertas[i].energiaHp[j] / 24) + (19 * historialOfertas[i].energiaHfp[j] / 24)
        return precioPotencia + precioEnergia
      })
      return null
    })
    return historialOfertas
  } catch (e) {
    throw handleError(e)
  }
}
