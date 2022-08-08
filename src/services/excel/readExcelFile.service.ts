import XLSX from 'xlsx'
export const readExcelFile = (filename: string): XLSX.WorkBook => {
  const workbook = XLSX.readFile(filename)
  return workbook
}
