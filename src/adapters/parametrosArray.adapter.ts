import { JsonParametroData } from '../types/data'
import { HistorialParametroModel, ParametrosProyeccion } from '../types/models'

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
export const createParametrosProyeccionAdapter = (jsons: JsonParametroData[]): ParametrosProyeccion[] => {
  const data = jsons.map((json, i) => {
    if (i === 0) {
      return {
        _id: '',
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
      _id: json.Nombre,
      name: json.Meses,
      values
    }
  })
  return data
}
