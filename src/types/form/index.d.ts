import { Types } from 'mongoose'
import { Proveedor } from '../data'
import { Estado } from '../enums'

export interface FieldsAdd {
  name: string
}
export interface CodeUserFields {
  user: Types.ObjectId
  code: string
}
export interface CodeProveedorFields {
  code: string
  proveedor: string
}
export interface ConfirmAccount {
  code: string
  idUser: string
}
export interface ConfirmProveedor {
  code: string
  correo: string
}
export interface DaoProveedorRegister extends ProveedorRegisterFields{
  codeToConfirm: string
}
interface EspecificacionMes {
  mes: string
  hp: number
  hfp: number
}
interface FactorIndex {
  factor: number
  indexId: string
}
export interface LicitacionRegisterFields{
  title: string
  author: string
  description: string
  fechaInicioApertura: string
  fechaFinApertura: string
  tipoServicio: Types.ObjectId
  numLicitacion: number
  requisitos: string
  estado: Estado
  empresa: string
  fechaInicio: string
  fechaFin: string
  puntoSum: Types.ObjectId
  brg: Types.ObjectId
  factorPlanta: number
  meses: EspecificacionMes[]
  usuario: Types.ObjectId
}
export interface LoginFields {
  correo: string
  password: string
}

export interface ProveedorRegisterFields{
  correo: string
  password: string
  razSocial: string
  correo2: string
  ruc: number
  web?: string
  address: string
  phone1: number
  phone2: number
}
export type InfoBasicaProveedor=DocType<Pick<Proveedor, 'correo'|'address'|'phone1'|'razSocial'|'ruc'|'web'|'createdAt'|'updatedAt'>>
export interface UserRegisterFields{
  correo: string
  password: string
  empresa: string
  ruc: number
  web?: string
  phone: number
  address: string
}
