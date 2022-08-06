import { addParametroDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { ErrorResponse, HistorialParametros, ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'
import { formatFromStringToDate } from '../../utils/dateFormat'
import { FACTORES } from '../../constants'
import { generateMesesArray } from '../../utils'
import { addWorksheetToBook, createFile, createWorkbook, createWorksheetFromArrays } from '../excel'
export const addParametroService: Service<Omit<HistorialParametros, 'createdAt'|'updatedAt'|'fecha'> & {fecha: string}, ErrorResponse|ResponseParent> = async (fields) => {
  try {
    const parametro = await addParametroDao({ ...fields, fecha: formatFromStringToDate(fields.fecha) })
    if ('error' in parametro) throw new Error(parametro.message)
    return {
      message: `Nuevo histórico de ${parametro.valor} agregado exitosamente`
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al agregar el dato en la capa de servicios')
  }
}
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
      message: 'Se ha exportado el archivo exitosamente'
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al exportar el archivo')
  }
}
