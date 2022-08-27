import { createTarifasArrayAdapter } from '../../adapters'
import { JsonTarifasData, ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'
import { getJsonFromSheet, readExcelFile } from '../excel'
import fs from 'fs'
import { handleError } from '../../helpers/handleError'
import { updateMultipleTarifasDao } from '../../dao/tarifa-energia-hfp'
export const updateTarifasService: Service<{path: string}, ResponseParent> = async ({ path }) => {
  try {
    const workbook = readExcelFile(path)
    const sheet = workbook.Sheets['Base de datos Tarifa Energía HFP']
    const jsons = getJsonFromSheet<JsonTarifasData>(sheet)
    const valuesArray = createTarifasArrayAdapter(jsons)
    console.log('Hoja de excel', valuesArray)
    const response = await updateMultipleTarifasDao(valuesArray)
    fs.rmSync(path)
    return response
  } catch (e) {
    throw handleError(e)
  }
}
