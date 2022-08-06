import XLSX from 'xlsx'
export const createWorksheetFromArrays = (data: any[]): XLSX.WorkSheet => {
  return XLSX.utils.aoa_to_sheet(data)
}
