import { handleError } from '../../helpers/handleError'
import { ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'
import { getJsonFromSheet, readExcelFile } from '../excel'
import fs from 'fs'
import { createTarifasArrayAdapter } from '../../adapters'
import { insertMultipleTarifasDao } from '../../dao/tarifa-energia-hfp'
export const addTarifasService: Service<{filename: string}, ResponseParent> = async ({ filename }) => {
  try {
    const workbook = readExcelFile(filename)
    const sheet = workbook.Sheets['Base de datos Tarifa Energía HFP']
    const jsons = getJsonFromSheet<{Meses: string, [index: string]: number|string}>(sheet)
    const valuesArray = createTarifasArrayAdapter(jsons)
    console.log('Hoja de excel', valuesArray)
    const response = await insertMultipleTarifasDao(valuesArray)
    fs.rmSync(filename)
    return response
  } catch (err) {
    throw handleError(err)
  }
}
