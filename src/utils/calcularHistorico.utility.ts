import { DocType, Oferta, Proveedor } from '../types/data'
import { HistorialParametroModel } from '../types/models'

export const calcularHistorico = (historicoParametros: Array<DocType<HistorialParametroModel>>, bloquesMeses: string[][], oferta: DocType<Oferta> & {proveedor: Pick<Proveedor, 'razSocial'>}): Array<{fecha: string, value: number}> => {
  return bloquesMeses.flat().map((mes) => {
    let founded = false
    const potenciaBase = bloquesMeses.reduce((prev, curre, j) => {
      if (founded) return prev
      const value = curre.filter((el) => el === mes)
      if (value.length !== 0) {
        founded = true
        return oferta.potencia[j].potencia
      }
      return oferta.potencia[j].potencia
    }, oferta.potencia[0].potencia)
    const factor = oferta.formulaIndexPotencia.reduce((prev, current) => {
      const parametro = historicoParametros.find((parametro) => parametro._id.toString() === current.indexId.toString())
      if (parametro == null) return prev
      const valueParametroActual = parametro.values.find((el) => el.fecha === mes)?.value
      if (valueParametroActual == null) return prev
      const mesOferta = (oferta.createdAt.getMonth() + 1).toString() + '-' + oferta.createdAt.getFullYear().toString()
      const parametroBase = parametro.values.find((el) => el.fecha === mesOferta)?.value
      if (parametroBase == null) return prev
      const result = current.factor * valueParametroActual / parametroBase + prev
      return result
    }, 0)
    return {
      fecha: mes,
      value: potenciaBase * factor
    }
  })
}
export const calcularHistoricoEnergiaHp = (historicoParametros: Array<DocType<HistorialParametroModel>>, bloquesMeses: string[][], oferta: DocType<Oferta> & {proveedor: Pick<Proveedor, 'razSocial'>}): Array<{fecha: string, value: number}> => {
  return bloquesMeses.flat().map((mes) => {
    let founded = false
    const energiaBase = bloquesMeses.reduce((prev, curre, j) => {
      if (founded) return prev
      const value = curre.filter((el) => el === mes)
      if (value.length !== 0) {
        founded = true
        return oferta.energiaHp[j].energia
      }
      return oferta.energiaHp[j].energia
    }, oferta.energiaHp[0].energia)
    const factor = oferta.formulaIndexEnergia.reduce((prev, current) => {
      const parametro = historicoParametros.find((parametro) => parametro._id.toString() === current.indexId.toString())
      if (parametro == null) return prev
      const valueParametroActual = parametro.values.find((el) => el.fecha === mes)?.value
      if (valueParametroActual == null) return prev
      const mesOferta = (oferta.createdAt.getMonth() + 1).toString() + '-' + oferta.createdAt.getFullYear().toString()
      const parametroBase = parametro.values.find((el) => el.fecha === mesOferta)?.value
      if (parametroBase == null) return prev
      const result = current.factor * valueParametroActual / parametroBase + prev
      return result
    }, 0)
    return {
      fecha: mes,
      value: energiaBase * factor
    }
  })
}
export const calcularHistoricoEnergiaHfp = (historicoParametros: Array<DocType<HistorialParametroModel>>, bloquesMeses: string[][], oferta: DocType<Oferta> & {proveedor: Pick<Proveedor, 'razSocial'>}): Array<{fecha: string, value: number}> => {
  return bloquesMeses.flat().map((mes) => {
    let founded = false
    const energiaBase = bloquesMeses.reduce((prev, curre, j) => {
      if (founded) return prev
      const value = curre.filter((el) => el === mes)
      if (value.length !== 0) {
        founded = true
        return oferta.energiaHfp[j].energia
      }
      return oferta.energiaHfp[j].energia
    }, oferta.energiaHfp[0].energia)
    const factor = oferta.formulaIndexEnergia.reduce((prev, current) => {
      const parametro = historicoParametros.find((parametro) => parametro._id.toString() === current.indexId.toString())
      if (parametro == null) return prev
      const valueParametroActual = parametro.values.find((el) => el.fecha === mes)?.value
      if (valueParametroActual == null) return prev
      const mesOferta = (oferta.createdAt.getMonth() + 1).toString() + '-' + oferta.createdAt.getFullYear().toString()
      const parametroBase = parametro.values.find((el) => el.fecha === mesOferta)?.value
      if (parametroBase == null) return prev
      const result = current.factor * valueParametroActual / parametroBase + prev
      return result
    }, 0)
    return {
      fecha: mes,
      value: energiaBase * factor
    }
  })
}
