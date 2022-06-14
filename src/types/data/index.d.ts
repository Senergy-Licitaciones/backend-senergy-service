import { Document, Types } from 'mongoose'
import { FactorIndex, LicitacionRegisterFields, ProveedorRegisterFields, UserRegisterFields } from '../form'
import { Estado, Role, Type } from './enums'
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
export type DataToken=DataProveedorToken|DataUserToken
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
export type DocType<Param>=Document<any, any, Param> & Param & {
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
export interface Licitacion extends LicitacionRegisterFields{
  participantes: Types.Array<Types.ObjectId>
  createdAt: Date
  updatedAt: Date
}
export interface Oferta{
  potencia: number
  energiaHp: number
  energiaHfp: number
  potMinFacturable: number
  potenciaFacturar: string
  excesoPotencia: number
  formulaIndexPotencia: Types.Array<FactorIndex> // recommended by mongoose doc
  formulaIndexEnergia: Types.Array<FactorIndex>
  proveedor: Types.ObjectId
  licitacion: Types.ObjectId
}
export interface Proveedor extends ProveedorRegisterFields{
  role: Role
  estado: Estado
  codeToConfirm: string
  verified: boolean
  session: string
  licitaciones: Types.Array<Types.ObjectId>
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
