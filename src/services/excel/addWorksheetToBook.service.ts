import XLSX from 'xlsx'
export const addWorksheetToBook = (book: XLSX.WorkBook, worksheet: XLSX.WorkSheet, name: string): void => {
  return XLSX.utils.book_append_sheet(book, worksheet, name)
}
