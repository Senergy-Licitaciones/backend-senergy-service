import { HistorialParametro, ValueByFecha } from '../schemas'

export interface HistorialParametroModel extends Pick<HistorialParametro, 'name'>{
  values: ValueByFecha[]
}
