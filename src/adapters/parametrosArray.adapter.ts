import { JsonParametroData } from '../types/data'
import { HistorialParametroModel } from '../types/models'

export const createParametrosArrayAdapter = (jsons: JsonParametroData[]): HistorialParametroModel[] => {
  const data = jsons.map((json, i) => {
    if (i === 0) {
      return {
        name: '',
        values: []
      }
    }
    const values: Array<{fecha: string, value: number}> = []
    for (const key in json) {
      if (key !== 'Meses' && key !== 'Nombre') {
        values.push({
          fecha: key,
          value: json[key] as number
        })
      }
    }
    return {
      name: json.Nombre,
      values
    }
  })
  data.shift()
  return data
}
