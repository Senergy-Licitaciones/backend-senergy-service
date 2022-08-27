import { handleError } from '../../helpers/handleError'
import { Dao } from '../../types/methods'
import TarifaPotenciaModel from '../../apiServices/tarifa-potencia/model'
import type { Types } from 'mongoose'
import { ValueByFecha } from '../../types/schemas'
export const updateTarifaDao: Dao<{id: string, valor: number, fecha: string}, void> = async ({ id, valor, fecha }) => {
  try {
    console.log('antes del await')
    const tarifa = await TarifaPotenciaModel.findById(id)
    if (tarifa == null) throw new Error('No existe el parametro')
    const result = tarifa.values.reduce((acc, curr, index) => {
      if (curr.fecha === fecha) {
        acc.values[index] = {
          fecha,
          value: valor
        }
        return {
          isActual: true,
          values: [...acc.values]
        }
      }
      if (index === tarifa.values.length - 1 && !acc.isActual) {
        return {
          isActual: false,
          values: [...acc.values, { fecha, value: valor }]
        }
      }
      return acc
    }, { isActual: false, values: [...tarifa.values] })
    console.log(result)
    tarifa.values = result.values as Types.Array<ValueByFecha>
    await tarifa.save()
  } catch (e) {
    console.log(e)
    throw handleError(e, 'Ha ocurrido un error al actualizar el parámetro')
  }
}
