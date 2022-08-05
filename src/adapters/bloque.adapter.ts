import { Types } from 'mongoose'
import { EnergiaBloque, PotenciaBloque } from '../types/data'
import { EnergiaBloqueReq, PotenciaBloqueReq } from '../types/requests'

export const createPotenciaBloqueAdapter = (request: PotenciaBloqueReq[]): Types.Array<PotenciaBloque> => {
  console.log('iniciando adapter potencia', request)
  const array = new Types.Array<PotenciaBloque>()
  console.log('array ', array)
  if (request.length === 0) return array
  console.log('dsps del if')
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
  console.log('iniciando adapter energia', request)
  const array = new Types.Array<EnergiaBloque>()
  console.log(array)
  if (request.length === 0) return array
  console.log('dsps del if energy')
  request.map((bloque) => {
    return array.push({
      energia: bloque.energia,
      fechaInicio: new Date(bloque.fechaInicio),
      fechaFin: new Date(bloque.fechaFin)
    })
  }
  )
  console.log(array)
  return array
}
