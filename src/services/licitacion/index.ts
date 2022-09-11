import { Types } from 'mongoose'
import { createParametrosProyeccionAdapter } from '../../adapters'
import { getHistorialParametrosListDao } from '../../dao/historial-parametros'
import { showLicitacionesDao, createLicitacionDao, updateLicitacionDao, getTiposDao, getLicitacionesFreeDao, getLicitacionByIdDao, getLicitacionesToAdminDao } from '../../dao/licitacion'
import { getOfertasByLicitacionAndProveedorDao } from '../../dao/oferta'
import { handleError } from '../../helpers/handleError'
import { DocType, Licitacion, Oferta, Proveedor, ResponseParent } from '../../types/data'
import { LicitacionRegisterFields } from '../../types/form'
import { Service, ServiceWithoutParam } from '../../types/methods'
import { ParametrosProyeccion } from '../../types/models'
import { MetricasEmpresa } from '../../types/models/MetricasEmpresa.model'
import { LicitacionToAdmin } from '../../types/responses'
import { calcularHistorico, calcularHistoricoEnergiaHfp, calcularHistoricoEnergiaHp, generateMesesArray } from '../../utils'
import { getJsonFromSheet, readExcelFile } from '../excel'
import fs from 'fs'
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
export const getListParametrosUsados = async (id: Types.ObjectId): Promise<{parametros: string[], ofertas: Array<DocType<Oferta>&{proveedor: Pick<Proveedor, 'razSocial'>}>, historialOfertas: MetricasEmpresa[]}> => {
  try {
    const ofertas = await getOfertasByLicitacionAndProveedorDao({ licitacionId: id })
    console.log('ofertas ', ofertas)
    const parametros: string[] = []
    const historialOfertas: MetricasEmpresa[] = ofertas.map((oferta) => {
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
    return {
      parametros,
      historialOfertas,
      ofertas
    }
  } catch (e) {
    throw handleError(e)
  }
}
export const makeCalculoService: Service<{ historialOfertas: MetricasEmpresa[], ofertas: Array<DocType<Oferta>&{proveedor: Pick<Proveedor, 'razSocial'>}>, historicoParametros: ParametrosProyeccion[]}, MetricasEmpresa[]> = async ({ historialOfertas, historicoParametros, ofertas }) => {
  try {
    // historico sacado de la proyeccion hecha del historico base de parametros

    // const historicoParametros = await getHistorialParametrosListDao(parametros)

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
        const precioPotencia = value.value * 100 * 10 / (720 * 0.79751092507001)
        console.log('first precio potencia ', precioPotencia)
        const precioEnergia = (5 * historialOfertas[i].energiaHp[j].value / 24) + (19 * historialOfertas[i].energiaHfp[j].value / 24)
        return {
          fecha: value.fecha,
          value: precioPotencia + precioEnergia
        }
      })
      return null
    })
    return historialOfertas
  } catch (e) {
    throw handleError(e)
  }
}
export const calculoSimple: Service<Types.ObjectId, MetricasEmpresa[]> = async (id) => {
  try {
    const { historialOfertas, ofertas, parametros } = await getListParametrosUsados(id)
    const historicoParametros = await getHistorialParametrosListDao(parametros)
    const response = await makeCalculoService({ historialOfertas, historicoParametros, ofertas })
    return response
  } catch (e) {
    throw handleError(e)
  }
}
export const getParametrosFromExcel = (parametros: string[], filename: string): ParametrosProyeccion[] => {
  const workbook = readExcelFile(filename)
  const sheet = workbook.Sheets['Parametros Proyeccion']
  const json = getJsonFromSheet<{Meses: string, Nombre: string, [index: string]: number|string}>(sheet)
  const data = createParametrosProyeccionAdapter(json)
  return data.filter((parametro) => parametros.includes(parametro._id))
}
export const calculoExcel: Service<{idLicitacion: Types.ObjectId, filename: string}, MetricasEmpresa[]> = async ({ filename, idLicitacion }) => {
  try {
    const { historialOfertas, ofertas, parametros } = await getListParametrosUsados(idLicitacion)
    const historicoParametros = getParametrosFromExcel(parametros, filename)
    const response = await makeCalculoService({ historialOfertas, historicoParametros, ofertas })
    fs.rmSync(filename)
    return response
  } catch (e) {
    throw handleError(e)
  }
}
