import { createParametrosArrayAdapter } from '../../adapters/parametrosArray.adapter'
import { insertMultipleParametrosDao } from '../../dao/historial-parametros'
import { handleError } from '../../helpers/handleError'
import { ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'
import { getJsonFromSheet, readExcelFile } from '../excel'
import fs from 'fs'
export const addParametrosService: Service<{filename: string}, ResponseParent> = async ({ filename }) => {
  try {
    console.log('iniciando método')
    const workbook = readExcelFile(filename)
    const sheet = workbook.Sheets['Base de datos Factores']
    const jsons = getJsonFromSheet<{Meses: string, Nombre: string, [index: string]: number|string}>(sheet)
    const valuesArray = createParametrosArrayAdapter(jsons)
    console.log('Hoja de excel', valuesArray)
    const response = await insertMultipleParametrosDao(valuesArray)
    fs.rmSync(filename)
    return response
  } catch (err) {
    throw handleError(err)
  }
}
