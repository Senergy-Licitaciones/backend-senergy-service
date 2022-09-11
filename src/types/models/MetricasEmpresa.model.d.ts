export interface MetricasEmpresa{
  empresa: string
  monomico: Array<{fecha: string, value: number}>
  potencia: Array<{fecha: string, value: number}>
  energiaHp: Array<{fecha: string, value: number}>
  energiaHfp: Array<{fecha: string, value: number}>
  total: number
}
