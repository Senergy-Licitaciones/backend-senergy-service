import { HistorialParametro, ValueByFecha } from '../schemas'

export interface HistorialParametroModel extends Pick<HistorialParametro, 'name'>{
  values: ValueByFecha[]
}
export interface ParametrosProyeccion{
  _id: string
  name: string
  values: ValueByFecha[]
}
