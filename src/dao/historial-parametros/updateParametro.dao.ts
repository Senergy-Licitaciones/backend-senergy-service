import { handleError } from '../../helpers/handleError'
import { Dao } from '../../types/methods'
import HistorialParametrosModel from '../../apiServices/historial-parametros/model'
import { Types } from 'mongoose'
import { ValueByFecha } from '../../types/schemas'
export const updateParametroDao: Dao<{id: string, valor: number, fecha: string}, void> = async ({ id, valor, fecha }) => {
  try {
    console.log('antes del await')
    const parametro = await HistorialParametrosModel.findById(id)
    if (parametro == null) throw new Error('No existe el parametro')
    const result = parametro.values.reduce((acc, curr, index) => {
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
      if (index === parametro.values.length - 1 && !acc.isActual) {
        return {
          isActual: false,
          values: [...acc.values, { fecha, value: valor }]
        }
      }
      return acc
    }, { isActual: false, values: [...parametro.values] })
    console.log(result)
    parametro.values = result.values as Types.Array<ValueByFecha>
    await parametro.save()
  } catch (e) {
    console.log(e)
    throw handleError(e, 'Ha ocurrido un error al actualizar el parámetro')
  }
}
