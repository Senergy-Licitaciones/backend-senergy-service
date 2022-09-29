export const proyeccionPPI = (valorBase: number): number => {
  return valorBase * (1 + 0.016 / 12)
}
export const proyeccionIPC = (valorBase: number): number => {
  return valorBase * (1 + 0.004505)
}
export const proyeccionPGNDolarOsinergmin = (valorBase: number): number => {
  return valorBase * (1 + 0.0283 / 12)
}
export const proyeccionPGNSolesOsinergmin = (valorBase: number): number => {
  return valorBase * (1 + 0.00551)
}
export const proyeccionPGNDolarCoes = (valorBase: number): number => {
  return valorBase * (1 + 0.025 / 12)
}
export const proyeccionPCBandPR6 = (valorBase: number): number => {
  return valorBase * (1 + 0.00133)
}
export const proyeccionTarifaChiclayo = (valorBase: number): number => {
  return valorBase * (1 + 0.025 / 12)
}
