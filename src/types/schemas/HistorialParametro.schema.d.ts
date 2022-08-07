import { Types } from 'mongoose'
export interface ValueByFecha{
  fecha: string
  value: number
}
export interface HistorialParametro{
  name: string
  values: Types.Array<ValueByFecha>
  createdAt: Date
  updatedAt: Date
}
