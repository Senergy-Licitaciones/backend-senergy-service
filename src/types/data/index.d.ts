import { Document, Types } from 'mongoose'
import { FactorIndex, LicitacionRegisterFields, ProveedorRegisterFields, UserRegisterFields } from '../form'
import { Estado, Parametro, Role, RoleAdmin, Type, Unidad } from './enums'
export interface Admin{
  correo: string
  name: string
  password: string
  role: RoleAdmin
  createdAt: Date
  updatedAt: Date
}
interface Code{
  code: string
  expiredTime: Date
}
export interface CodeUser extends Code{
  user: string
}
export interface CodeProveedor extends Code{
  proveedor: string
}
export type DataToken=DataProveedorToken|DataUserToken | DataAdminToken
export interface DataUserToken {
  _id: string
  empresa: string
  role: Role
  type: Type.User
}
export interface DataProveedorToken {
  _id: string
  razSocial: string
  type: Type.Proveedor
}
export interface DataAdminToken{
  _id: string
  type: Type.Admin
  name: string
  correo: string
}
export type DocType<Param> = Document<any, any, Param> & Param & {
  _id: Types.ObjectId
}
export interface ErrorResponse extends ResponseParent{
  error: Error
}
export interface Info {
  numLicitaciones: number
  numParticipantes: number
  lastProvider: string
  empresa: string
  address: string
  phone: number
  correo: string
  lastLicitacion: {
    _id: string
    ruc: number
    participantes: number
    fechaInicioapertura: string
    fechaFinApertura: string
  }|ResponseParent
}
export interface InfoDashboardProveedor{
  numOfertas: number
  numLicitaciones: number
  plan: Role
  timeToExpireLic: string
  ofertas: Array<{fechaInicio: Date, fechaFin: Date, participantes: number, empresa: string}>
  licitaciones: Array<{fechaInicioApertura: Date, fechaFinApertura: Date, empresa: string, participantes: number}>
}
export interface Licitacion extends LicitacionRegisterFields{
  participantes: Types.Array<Types.ObjectId>
  createdAt: Date
  updatedAt: Date
}
export interface EnergiaBloque{
  fechaInicio: Date
  fechaFin: Date
  energia: number
}
export interface PotenciaBloque extends Omit<EnergiaBloque, 'energia'>{
  potencia: number
}

export interface Oferta{
  potencia: Types.Array<PotenciaBloque>
  tarifaPotencia: boolean
  tarifaEnergiaHp: boolean
  tarifaEnergiaHfp: boolean
  energiaHp: Types.Array<EnergiaBloque>
  energiaHfp: Types.Array<EnergiaBloque>
  potMinFacturable: number
  potenciaFacturar: string
  excesoPotencia: number
  formulaIndexPotencia: Types.Array<FactorIndex> // recommended by mongoose doc
  formulaIndexEnergia: Types.Array<FactorIndex>
  proveedor: Types.ObjectId
  licitacion: Types.ObjectId
  excesoEnergiaHp?: number
  excesoEnergiaHfp?: number
  createdAt: Date
  updatedAt: Date
}
export interface Proveedor extends ProveedorRegisterFields{
  role: Role
  estado: Estado
  session: string
  licitaciones: Types.Array<Types.ObjectId>
  createdAt: Date
  updatedAt: Date
}
export interface ResponseId extends ResponseParent{
  _id: Types.ObjectId
}
export interface ResponseParent{
  message: string
}
export interface ResponseRegisterUser extends ResponseParent{
  idUser: Types.ObjectId
}
export interface Session{
  type: Type
  jwt: string
  expireAt: Date
}
export interface SessionProveedor extends Session{
  proveedor: string
}
export interface SessionUser extends Session{
  user: string
}
export interface User extends UserRegisterFields{
  estado: Estado
  sessionId: string
  role: Role
}
export interface HistorialParametros{
  name: Parametro
  valor: number
  fecha: Date
  unidad: Unidad
  createdAt: Date
  updatedAt: Date
}
