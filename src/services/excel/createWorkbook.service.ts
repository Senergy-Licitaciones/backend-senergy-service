import XLSX from 'xlsx'
export const createWorkbook = (): XLSX.WorkBook => {
  return XLSX.utils.book_new()
}
