import { Types } from 'mongoose'
import { EnergiaBloque, PotenciaBloque } from '../types/data'
import { EnergiaBloqueReq, PotenciaBloqueReq } from '../types/requests'

export const createPotenciaBloqueAdapter = (request: PotenciaBloqueReq[]): Types.Array<PotenciaBloque> => {
  const array = new Types.Array<PotenciaBloque>()
  request.map((bloque) => {
    return array.push({
      potencia: bloque.potencia,
      fechaInicio: new Date(bloque.fechaInicio),
      fechaFin: new Date(bloque.fechaFin)
    })
  })
  return array
}
export const createEnergiaBloqueAdapter = (request: EnergiaBloqueReq[]): Types.Array<EnergiaBloque> => {
  const array = new Types.Array<EnergiaBloque>()
  request.map((bloque) => {
    return array.push({
      energia: bloque.energia,
      fechaInicio: new Date(bloque.fechaInicio),
      fechaFin: new Date(bloque.fechaFin)
    })
  }
  )
  return array
}
