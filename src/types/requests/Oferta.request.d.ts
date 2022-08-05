import { Oferta } from '../data'
export interface PotenciaBloqueReq{
  potencia: number
  fechaInicio: string
  fechaFin: string
}
export interface EnergiaBloqueReq{
  energia: number
  fechaInicio: string
  fechaFin: string
}
export interface OfertaRequest extends Omit<Oferta, 'proveedor'| 'potencia'|'energiaHp'|'energiaHfp'|'createdAt'|'updatedAt'> {
  potencia: PotenciaBloqueReq[]
  energiaHp: EnergiaBloqueReq[]
  energiaHfp: EnergiaBloqueReq[]
}
