import { createParametrosArrayAdapter } from '../../adapters/parametrosArray.adapter'
import { updateMultipleParametrosDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { JsonParametroData, ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'
import { getJsonFromSheet, readExcelFile } from '../excel'
import fs from 'fs'
export const updateParametrosService: Service<{path: string}, ResponseParent> = async ({ path }) => {
  try {
    const workbook = readExcelFile(path)
    const sheet = workbook.Sheets['Base de datos Factores']
    const jsons = getJsonFromSheet<JsonParametroData>(sheet)
    const valuesArray = createParametrosArrayAdapter(jsons)
    console.log('Hoja de excel', valuesArray)
    const response = await updateMultipleParametrosDao(valuesArray)
    fs.rmSync(path)
    return response
  } catch (e) {
    throw handleError(e)
  }
}
