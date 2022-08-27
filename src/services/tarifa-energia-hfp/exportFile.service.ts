import { TARIFAS_BARRA } from '../../constants'
import { getTarifasDao } from '../../dao/tarifa-energia-hfp'
import { handleError } from '../../helpers/handleError'
import { ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'
import { generateMesesArray } from '../../utils'
import { addWorksheetToBook, createFile, createWorkbook, createWorksheetFromArrays } from '../excel'

export const exportFileTarifa: Service<{fechaInicio: Date, fechaFin: Date, id: string}, ResponseParent> = async ({ fechaInicio, fechaFin, id }) => {
  try {
    const meses = generateMesesArray(fechaInicio, fechaFin)
    const ids = meses.map((_mes, i) => i + 1)
    const values = meses.map((_mes) => 0)
    const workbook = createWorkbook()
    const worksheet = createWorksheetFromArrays([
      ['Meses', ...meses],
      ['Barra', ...ids],
      ...TARIFAS_BARRA.map((el) => ([el, ...values]))
    ])
    addWorksheetToBook(workbook, worksheet, 'Base de datos Tarifa Energía HFP')
    const path = `uploads/files/admin/tarifas-energia-hfp-${id}.xlsx`
    createFile(workbook, path)
    return {
      message: 'Se ha exportado el archivo exitosamente',
      filename: `tarifas-energia-hfp-${id}.xlsx`
    }
  } catch (e) {
    throw handleError(e)
  }
}
export const exportFileToUpdateService: Service<{id: string}, {message: string, filename: string}> = async ({ id }) => {
  try {
    const tarifas = await getTarifasDao()
    const fechas = tarifas.reduce((acc, el) => {
      if (el.values.length > acc.length) {
        return el.values.map((value) => value.fecha)
      }
      return acc
    }, tarifas[0].values.map((value) => value.fecha))
    const workbook = createWorkbook()
    const worksheet = createWorksheetFromArrays([
      ['Meses', ...fechas],
      ['Barra', ...fechas.map((_el, i) => i + 1)],
      ...tarifas.map((el) => {
        const restValues = new Array(fechas.length - el.values.length).fill(0)
        return [el.name, ...el.values.map((value) => value.value), ...restValues]
      })
    ])
    addWorksheetToBook(workbook, worksheet, 'Base de datos Tarifa Energía HFP')
    const path = `uploads/files/admin/tarifas-energia-hfp-${id}.xlsx`
    createFile(workbook, path)
    return {
      message: 'Se ha exportado el archivo exitosamente',
      filename: `tarifas-energia-hfp-${id}.xlsx`
    }
  } catch (e) {
    throw handleError(e)
  }
}
