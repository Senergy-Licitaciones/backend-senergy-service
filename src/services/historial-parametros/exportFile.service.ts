import { FACTORES } from '../../constants'
import { getParametrosDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'
import { generateMesesArray } from '../../utils'
import { addWorksheetToBook, createFile, createWorkbook, createWorksheetFromArrays } from '../excel'

export const exportFileService: Service<{fechaInicio: Date, fechaFin: Date, id: string}, ResponseParent> = async ({ fechaInicio, fechaFin, id }) => {
  try {
    const meses = generateMesesArray(fechaInicio, fechaFin)
    const ids = meses.map((_mes, i) => i + 1)
    const values = meses.map((_mes) => 0)
    const workbook = createWorkbook()
    const worksheet = createWorksheetFromArrays([
      ['Meses', 'Nombre', ...meses],
      ['Codigo', 'Id', ...ids],
      ...FACTORES.map((el) => ([el.nombre, el.codigo, ...values]))
    ])
    addWorksheetToBook(workbook, worksheet, 'Base de datos Factores')
    const path = `uploads/files/admin/base-de-datos-factores-${id}.xlsx`
    createFile(workbook, path)
    return {
      message: 'Se ha exportado el archivo exitosamente',
      filename: `base-de-datos-factores-${id}.xlsx`
    }
  } catch (err) {
    throw handleError(err)
  }
}
export const exportFileToUpdateService: Service<{id: string}, {message: string, filename: string}> = async ({ id }) => {
  try {
    const parametros = await getParametrosDao()
    const workbook = createWorkbook()
    const fechas = parametros.reduce((acc, el) => {
      if (el.values.length > acc.length) {
        return el.values.map((value) => value.fecha)
      }
      return acc
    }, parametros[0].values.map((value) => value.fecha))
    const worksheet = createWorksheetFromArrays([
      ['Meses', 'Nombre', ...fechas],
      ['Codigo', 'Id', ...fechas.map((_el, i) => i + 1)],
      ...parametros.map((el, i) => {
        const restValues = new Array(fechas.length - el.values.length).fill(0)
        return [i, el.name, ...el.values.map((value) => value.value), ...restValues]
      })
    ])
    addWorksheetToBook(workbook, worksheet, 'Base de datos Factores')
    const path = `uploads/files/admin/base-de-datos-factores-${id}.xlsx`
    createFile(workbook, path)
    return {
      message: 'Se ha exportado el archivo exitosamente',
      filename: `base-de-datos-factores-${id}.xlsx`
    }
  } catch (e) {
    throw handleError(e)
  }
}
