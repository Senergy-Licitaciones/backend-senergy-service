import { createParametrosArrayAdapter } from '../../adapters/parametrosArray.adapter'
import { updateMultipleParametrosDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { ErrorResponse, JsonParametroData, ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'
import { getJsonFromSheet, readExcelFile } from '../excel'
import fs from 'fs'
export const updateParametrosService: Service<{path: string}, ResponseParent|ErrorResponse> = async ({ path }) => {
  try {
    const workbook = readExcelFile(path)
    const sheet = workbook.Sheets['Base de datos Factores']
    const jsons = getJsonFromSheet<JsonParametroData>(sheet)
    const valuesArray = createParametrosArrayAdapter(jsons)
    console.log('Hoja de excel', valuesArray)
    const response = await updateMultipleParametrosDao(valuesArray)
    if ('error' in response) return handleError(response.error, response.message)
    fs.rmSync(path)
    return response
  } catch (e) {
    const error = e as Error
    return handleError(error, 'Ha ocurrido un error al actualizar los parametros en la capa de servicios')
  }
}
