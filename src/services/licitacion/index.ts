import { Types } from 'mongoose'
import { createParametrosProyeccionAdapter } from '../../adapters'
import { getHistorialParametrosListDao } from '../../dao/historial-parametros'
import { showLicitacionesDao, createLicitacionDao, updateLicitacionDao, getTiposDao, getLicitacionesFreeDao, getLicitacionByIdDao, getLicitacionesToAdminDao, getDataFromLicitacionToCalculo } from '../../dao/licitacion'
import { getOfertasByLicitacionAndProveedorDao } from '../../dao/oferta'
import { handleError } from '../../helpers/handleError'
import { DocType, Licitacion, Oferta, Proveedor, ResponseParent } from '../../types/data'
import { LicitacionRegisterFields } from '../../types/form'
import { Service, ServiceWithoutParam } from '../../types/methods'
import { HistorialParametroModel, ParametrosProyeccion } from '../../types/models'
import { MetricasEmpresa } from '../../types/models/MetricasEmpresa.model'
import { LicitacionToAdmin } from '../../types/responses'
import { calcularHistorico, calcularHistoricoEnergiaHfp, calcularHistoricoEnergiaHp, generateMesesArray } from '../../utils'
import { getJsonFromSheet, readExcelFile } from '../excel'
import { formatFromStringToDate, formatMesDateToString, formatMesStringToDate } from '../../utils/dateFormat'
import fs from 'fs'
import { ValueByFecha } from '../../types/schemas'
import { proyeccionIPC, proyeccionPCBandPR6, proyeccionPGNDolarCoes, proyeccionPGNDolarOsinergmin, proyeccionPGNSolesOsinergmin, proyeccionPPI, proyeccionTarifaChiclayo } from '../../utils/formulasProyeccion'
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
        energiaHfp: [],
        total: 0
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
export const getEnergiaToAdd = (potenciaOferta: number, potenciaContratadaHp: number, potenciaMinimaFact: number, factorPlanta: number): number => {
  const energiaMes = factorPlanta * potenciaContratadaHp * 24 * 30 / 1000
  const pagoPotencia = potenciaContratadaHp * potenciaMinimaFact * potenciaOferta
  return pagoPotencia / (energiaMes * 12)
}
export const makeCalculoService: Service<{ historialOfertas: MetricasEmpresa[], ofertas: Array<DocType<Oferta>&{proveedor: Pick<Proveedor, 'razSocial'>}>, historicoParametros: ParametrosProyeccion[], licitacion: {potenciaContratadaHp: number, factorPlanta: number}}, MetricasEmpresa[]> = async ({ historialOfertas, historicoParametros, ofertas, licitacion }) => {
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
      // calcular equivalente en energia
      const energia = getEnergiaToAdd(oferta.potencia[0].potencia, licitacion.potenciaContratadaHp, oferta.potMinFacturable / 100, licitacion.factorPlanta)
      const bloquesMesesEnergiaHp = oferta.energiaHp.map((bloque) => {
        const meses = generateMesesArray(bloque.fechaInicio, bloque.fechaFin)
        return meses
      })
      const bloquesMesesEnergiaHfp = oferta.energiaHfp.map((bloque) => {
        const meses = generateMesesArray(bloque.fechaInicio, bloque.fechaFin)
        return meses
      })
      historialOfertas[i].potencia = calcularHistorico(historicoParametros, bloquesMesesPotencia, oferta)
      historialOfertas[i].energiaHp = calcularHistoricoEnergiaHp(energia, historicoParametros, bloquesMesesEnergiaHp, oferta)
      historialOfertas[i].energiaHfp = calcularHistoricoEnergiaHfp(energia, historicoParametros, bloquesMesesEnergiaHfp, oferta)
      historialOfertas[i].monomico = historialOfertas[i].potencia.map((value, j) => {
        const precioPotencia = value.value * 100 * 10 / (720 * 0.79751092507001)
        console.log('first precio potencia ', precioPotencia)
        const precioEnergia = (5 * historialOfertas[i].energiaHp[j].value / 24) + (19 * historialOfertas[i].energiaHfp[j].value / 24)
        return {
          fecha: value.fecha,
          value: precioPotencia + precioEnergia
        }
      })
      historialOfertas[i].total = historialOfertas[i].monomico.reduce((total, el) => {
        return total + el.value
      }, 0)
      return null
    })
    return historialOfertas
  } catch (e) {
    throw handleError(e)
  }
}
// TODO: Histrial Parametros Proyeccion fechas en formato "[Mes sin 0]-[Año completo]". Ejemplo: 8/2022
export const getProyeccionHistorialParametros = async (fechaOferta: string, fechaFinal: string, listIdsParametros: string[]): Promise<Array<DocType<HistorialParametroModel>>> => {
  try {
    console.log('fechaOferta', fechaOferta, 'fecha final', fechaFinal)
    const parametrosBase = await getHistorialParametrosListDao(listIdsParametros)
    const parametrosProyectados = parametrosBase.map((parametro) => {
      let valorBase = 0
      let existBase = false
      const mesesProyectados: string[] = generateMesesArray(formatMesStringToDate(fechaOferta), formatMesStringToDate(fechaFinal))
      if (parametro.values[parametro.values.length - 1].fecha === fechaOferta) {
        // existe parametro para la fecha en la que se hizo la oferta
        existBase = true
      }
      // no existe parametro para la fecha en la que se hizo la oferta
      valorBase = parametro.values[parametro.values.length - 1].value
      let valuePrev = valorBase
      const valoresParametrosProyectados: ValueByFecha[] = mesesProyectados.map((mes, i) => {
        let value = 0
        if (parametro.name.includes('PPI')) {
          value = proyeccionPPI(valuePrev)
        }
        if (parametro.name.includes('IPC')) {
          value = proyeccionIPC(valuePrev)
        }
        if (parametro.name.includes('PGN(US$/MMBTU) (OSINERGMIN)')) {
          value = proyeccionPGNDolarOsinergmin(valuePrev)
        }
        if (parametro.name.includes('PGN(S/./MMBTU) (OSINERGMIN)')) {
          value = proyeccionPGNSolesOsinergmin(valuePrev)
        }
        if (parametro.name.includes('PGN(US$/MMBTU)(COES)')) {
          value = proyeccionPGNDolarCoes(valuePrev)
        }
        if (parametro.name.includes('PCB') || parametro.name.includes('PR6')) {
          value = proyeccionPCBandPR6(valuePrev)
        }
        if (parametro.name.includes('TBarra')) {
          value = proyeccionTarifaChiclayo(valuePrev)
        }
        valuePrev = value
        return {
          fecha: mes,
          value: existBase && i === 0 ? valorBase : value
        }
      })
      return {
        _id: parametro._id,
        name: parametro.name,
        values: valoresParametrosProyectados
      }
    }) as Array<DocType<HistorialParametroModel>>
    return parametrosProyectados
  } catch (e) {
    throw handleError(e)
  }
}
// FIXME: expotFileProyeccionParamtros() para exportar excel
export const calculoFormulaConstante: Service<Types.ObjectId, {data: MetricasEmpresa[], ganador: string, proyeccionParametros: Array<DocType<HistorialParametroModel>>}> = async (id) => {
  try {
    const { historialOfertas, ofertas, parametros } = await getListParametrosUsados(id)
    const data = await getDataFromLicitacionToCalculo(id)
    if (ofertas.length === 0) throw new Error('No existen ofertas para esta licitación')
    const historicoParametros = await getProyeccionHistorialParametros(formatMesDateToString(formatFromStringToDate(data.fechaInicioApertura)), formatMesDateToString(formatFromStringToDate(data.fechaFin)), parametros)
    const response = await makeCalculoService({ historialOfertas, historicoParametros, ofertas, licitacion: { factorPlanta: data.factorPlanta, potenciaContratadaHp: data.meses[0].hp } })
    return {
      data: response,
      proyeccionParametros: historicoParametros,
      ganador: response.reduce((ganador, empresa) => {
        if (empresa.total < ganador.total) {
          return empresa
        }
        return ganador
      }
      , { empresa: '', total: Infinity }).empresa
    }
  } catch (e) {
    throw handleError(e)
  }
}
export const calculoSimple: Service<Types.ObjectId, {data: MetricasEmpresa[], ganador: string}> = async (id) => {
  try {
    const { historialOfertas, ofertas, parametros } = await getListParametrosUsados(id)
    const [historicoParametros, data] = await Promise.all([getHistorialParametrosListDao(parametros), getDataFromLicitacionToCalculo(id)])
    const response = await makeCalculoService({ historialOfertas, historicoParametros, ofertas, licitacion: { factorPlanta: data.factorPlanta, potenciaContratadaHp: data.meses[0].hp } })
    return {
      data: response,
      ganador: response.reduce((ganador, empresa) => {
        if (empresa.total < ganador.total) {
          return empresa
        }
        return ganador
      }
      , { empresa: '', total: Infinity }).empresa
    }
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
export const calculoExcel: Service<{idLicitacion: Types.ObjectId, filename: string}, {data: MetricasEmpresa[], ganador: string}> = async ({ filename, idLicitacion }) => {
  try {
    const [{ historialOfertas, ofertas, parametros }, data] = await Promise.all([getListParametrosUsados(idLicitacion), getDataFromLicitacionToCalculo(idLicitacion)])
    const historicoParametros = getParametrosFromExcel(parametros, filename)
    const response = await makeCalculoService({ historialOfertas, historicoParametros, ofertas, licitacion: { factorPlanta: data.factorPlanta, potenciaContratadaHp: data.meses[0].hp } })
    fs.rmSync(filename)
    return {
      data: response,
      ganador: response.reduce((menor, el) => {
        return el.total < menor.total ? el : menor
      }, { empresa: '', total: Infinity }).empresa
    }
  } catch (e) {
    throw handleError(e)
  }
}
export const getDatesFromLicitacion: Service<Types.ObjectId, {fechaInicio: Date, fechaFin: Date}> = async (idLicitacion) => {
  try {
    const licitacion = await getLicitacionByIdDao(idLicitacion)
    return {
      fechaInicio: formatFromStringToDate(licitacion.fechaInicio),
      fechaFin: formatFromStringToDate(licitacion.fechaFin)
    }
  } catch (e) {
    throw handleError(e)
  }
}
