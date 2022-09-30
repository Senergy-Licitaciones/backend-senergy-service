export const formatFromStringToDate = (fecha: string): Date => {
  const arrayFecha = fecha.split('-')
  return new Date(parseInt(arrayFecha[0]), parseInt(arrayFecha[1]) - 1, parseInt(arrayFecha[2]))
}
export const formatMesStringToDate = (mes: string): Date => {
  const arrayFecha = mes.split('-')
  return new Date(parseInt(arrayFecha[1]), parseInt(arrayFecha[0]) - 1)
}
export const formatMesDateToString = (fecha: Date): string => {
  const mes = (fecha.getMonth() + 1).toString()
  const year = fecha.getFullYear().toString()
  return mes + '-' + year
}
