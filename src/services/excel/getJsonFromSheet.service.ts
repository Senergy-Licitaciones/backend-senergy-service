import XLSX from 'xlsx'
export const getJsonFromSheet = <Format>(sheet: XLSX.WorkSheet): Format[] => {
  return XLSX.utils.sheet_to_json<Format>(sheet)
}
