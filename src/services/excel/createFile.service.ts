import XLSX from 'xlsx'
export const createFile = (book: XLSX.WorkBook, name: string): void => {
  return XLSX.writeFile(book, name)
}
