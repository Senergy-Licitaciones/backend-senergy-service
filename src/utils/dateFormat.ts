export const formatFromStringToDate = (fecha: string): Date => {
  const arrayFecha = fecha.split('-')
  return new Date(parseInt(arrayFecha[0]), parseInt(arrayFecha[1]) - 1, parseInt(arrayFecha[2]))
}
