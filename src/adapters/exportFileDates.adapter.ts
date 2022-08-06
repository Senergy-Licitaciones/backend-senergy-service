import { ExportFileAdminData } from '../types/data'
import { ExportFileAdminRequest } from '../types/requests'

export const createExportFileDates = ({ fechaInicio, fechaFin }: ExportFileAdminRequest): ExportFileAdminData => {
  const fechaInicioDate = new Date(fechaInicio)
  const fechaFinDate = new Date(fechaFin)
  return {
    fechaInicio: fechaInicioDate,
    fechaFin: fechaFinDate
  }
}
