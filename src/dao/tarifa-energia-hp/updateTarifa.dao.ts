import { handleError } from '../../helpers/handleError'
import { Dao } from '../../types/methods'
import type { Types } from 'mongoose'
import { ValueByFecha } from '../../types/schemas'
import TarifaEnergiaHpModel from '../../apiServices/tarifa-energia-hp/model'
export const updateTarifaDao: Dao<{id: string, valor: number, fecha: string}, void> = async ({ id, valor, fecha }) => {
  try {
    console.log('antes del await')
    const tarifa = await TarifaEnergiaHpModel.findById(id)
    if (tarifa == null) throw new Error('No existe la tarifa')
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
    throw handleError(e, 'Ha ocurrido un error al actualizar la tarifa')
  }
}
