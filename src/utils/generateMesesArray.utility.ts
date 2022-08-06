export const generateMesesArray = (fechaInicio: Date, fechaFin: Date): string[] => {
  const months = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 + fechaFin.getMonth() - fechaInicio.getMonth() + 1
  const array = Array(months).fill('')
  const flagDate = new Date(fechaInicio)
  return array.map((_el, i) => {
    i !== 0 && flagDate.setMonth(flagDate.getMonth() + 1)
    return (flagDate.getMonth() + 1).toString() + '-' + flagDate.getFullYear().toString()
  })
}
