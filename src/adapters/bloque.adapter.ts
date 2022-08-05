import { EnergiaBloque, PotenciaBloque } from '../types/data'
import { EnergiaBloqueReq, PotenciaBloqueReq } from '../types/requests'

export const createPotenciaBloqueAdapter = (request: PotenciaBloqueReq[]): PotenciaBloque[] => {
  console.log('iniciando adapter potencia', request)
  console.log('dsps del if')
  return request.map((bloque) => {
    return {
      potencia: bloque.potencia,
      fechaInicio: new Date(bloque.fechaInicio),
      fechaFin: new Date(bloque.fechaFin)
    }
  })
}
export const createEnergiaBloqueAdapter = (request: EnergiaBloqueReq[]): EnergiaBloque[] => {
  console.log('iniciando adapter energia', request)
  return request.map((bloque) => {
    return {
      energia: bloque.energia,
      fechaInicio: new Date(bloque.fechaInicio),
      fechaFin: new Date(bloque.fechaFin)
    }
  }
  )
}
