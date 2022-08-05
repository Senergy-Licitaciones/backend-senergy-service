import { Oferta } from '../types/data'
import { OfertaRequest } from '../types/requests'
import { createEnergiaBloqueAdapter, createPotenciaBloqueAdapter } from './bloque.adapter'

export const createOfertaAdapter = (request: OfertaRequest): Omit<Oferta, 'createdAt'|'updatedAt'> => {
  return {
    ...request,
    potencia: createPotenciaBloqueAdapter(request.potencia),
    energiaHp: createEnergiaBloqueAdapter(request.energiaHp),
    energiaHfp: createEnergiaBloqueAdapter(request.energiaHfp)
  }
}
