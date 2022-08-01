import { addParametroDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { ErrorResponse, HistorialParametros, ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'
import { formatFromStringToDate } from '../../utils/dateFormat'
import XLSX from 'xlsx'
import { FACTORES } from '../../constants'
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
export const exportFileService: Service<{fechaInicio: string, fechaFin: string, id: string}, ErrorResponse|ResponseParent> = async ({ fechaInicio, fechaFin, id }) => {
  try {
    const fechaInicioDate = new Date(fechaInicio)
    const fechaFinDate = new Date(fechaFin)
    const months = (fechaFinDate.getFullYear() - fechaInicioDate.getFullYear()) * 12 + fechaFinDate.getMonth() - fechaInicioDate.getMonth() + 1
    const array = Array(months).fill('')
    const flagDate = new Date(fechaInicioDate)
    const meses = array.map((_el, i) => {
      i !== 0 && flagDate.setMonth(flagDate.getMonth() + 1)
      return (flagDate.getMonth() + 1).toString() + '-' + flagDate.getFullYear().toString()
    })
    const ids = meses.map((_mes, i) => i + 1)
    const values = meses.map((_mes) => 0)
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['Meses', 'Nombre', ...meses],
      ['Codigo', 'Id', ...ids],
      ...FACTORES.map((el) => ([el.nombre, el.codigo, ...values]))
    ])
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Base de datos Factores')
    XLSX.writeFile(workbook, `uploads/files/admin/base-de-datos-factores-${id}.xlsx`)
    return {
      message: 'Se ha exportado el archivo exitosamente'
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al exportar el archivo')
  }
}
