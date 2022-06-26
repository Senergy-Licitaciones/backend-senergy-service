export default function calcTime (fechaProxima: Date, fechaActual: Date): string {
  const fechaProximaMs = fechaProxima.getTime()
  const fechaActualMs = fechaActual.getTime()
  const minus = fechaProximaMs - fechaActualMs
  if (minus / (1000 * 60 * 60 * 24) > 7) {
    return Math.trunc((minus / (1000 * 60 * 60 * 24 * 7))).toString() + 'sem'
  }
  if (minus / (1000 * 60 * 60) > 24) {
    return Math.trunc(minus / (1000 * 60 * 60 * 24)).toString() + 'd'
  }
  if (minus / (1000 * 60) > 60) {
    return Math.trunc(minus / (1000 * 60 * 60)).toString() + 'h'
  }
  if (minus / (1000) > 60) {
    return Math.trunc(minus / (1000 * 60)).toString() + 'min'
  }
  return 'Licitación próxima ya expirada'
}
