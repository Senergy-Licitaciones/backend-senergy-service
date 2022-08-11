import { FACTORES } from '../../constants'
import { getParametrosDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { ErrorResponse, ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'
import { generateMesesArray } from '../../utils'
import { addWorksheetToBook, createFile, createWorkbook, createWorksheetFromArrays } from '../excel'

export const exportFileService: Service<{fechaInicio: Date, fechaFin: Date, id: string}, ErrorResponse|ResponseParent> = async ({ fechaInicio, fechaFin, id }) => {
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
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al exportar el archivo')
  }
}
export const exportFileToUpdateService: Service<{id: string}, ErrorResponse|{message: string, filename: string}> = async ({ id }) => {
  try {
    const parametros = await getParametrosDao()
    if ('error' in parametros) return handleError(parametros.error, parametros.message)
    const workbook = createWorkbook()
    const worksheet = createWorksheetFromArrays([
      ['Meses', 'Nombre', ...parametros[0].values.map((el) => el.fecha)],
      ['Codigo', 'Id', ...parametros.map((_el, i) => i + 1)],
      ...parametros.map((el, i) => ([i, el.name, ...el.values.map((value) => value.value)]))
    ])
    addWorksheetToBook(workbook, worksheet, 'Base de datos Factores')
    const path = `uploads/files/admin/base-de-datos-factores-${id}.xlsx`
    createFile(workbook, path)
    return {
      message: 'Se ha exportado el archivo exitosamente',
      filename: `base-de-datos-factores-${id}.xlsx`
    }
  } catch (e) {
    const error = e as Error
    return handleError(error, 'Ha ocurrido un error al exportar el archivo')
  }
}
