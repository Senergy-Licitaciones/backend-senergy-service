import { Oferta } from '../types/data'
import { OfertaRequest } from '../types/requests'
import { createEnergiaBloqueAdapter, createPotenciaBloqueAdapter } from './bloque.adapter'

export const createOfertaAdapter = (request: OfertaRequest): Omit<Oferta, 'proveedor'|'createdAt'|'updatedAt'> => {
  console.log('createOfertaAdapter', request)
  return {
    excesoPotencia: request.excesoPotencia,
    excesoEnergiaHp: request.excesoEnergiaHp,
    excesoEnergiaHfp: request.excesoEnergiaHfp,
    formulaIndexEnergia: request.formulaIndexEnergia,
    formulaIndexPotencia: request.formulaIndexPotencia,
    licitacion: request.licitacion,
    potenciaFacturar: request.potenciaFacturar,
    potMinFacturable: request.potMinFacturable,
    tarifaEnergiaHp: request.tarifaEnergiaHp,
    tarifaEnergiaHfp: request.tarifaEnergiaHfp,
    tarifaPotencia: request.tarifaPotencia,
    potencia: createPotenciaBloqueAdapter(request.potencia),
    energiaHp: createEnergiaBloqueAdapter(request.energiaHp),
    energiaHfp: createEnergiaBloqueAdapter(request.energiaHfp)
  }
}
