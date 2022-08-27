import { JsonTarifasData } from '../types/data'
import { Tarifa } from '../types/models'

export const createTarifasArrayAdapter = (jsons: JsonTarifasData[]): Tarifa[] => {
  const data = jsons.map((json, i) => {
    if (i === 0) {
      return {
        name: '',
        values: []
      }
    }
    const values: Array<{fecha: string, value: number}> = []
    for (const key in json) {
      if (key !== 'Meses') {
        values.push({
          fecha: key,
          value: json[key] as number
        })
      }
    }
    return {
      name: json.Meses,
      values
    }
  })
  data.shift()
  return data
}
