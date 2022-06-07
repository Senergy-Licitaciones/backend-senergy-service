import { ObjectId, Types } from "mongoose"
import { Estado } from "../enums"

export type FieldsAdd={
    name:string
}
export type CodeUserFields={
    user:string,
    code:string
}
export type CodeProveedorFields={
    code:string,
    proveedor:string
}
export type ConfirmAccount={
    code:string,
    idUser:string
}
export type ConfirmProveedor={
    code:string,
    correo:string
}
export interface DaoProveedorRegister extends ProveedorRegisterFields{
    codeToConfirm:string
}
type EspecificacionMes={
    mes:string,
    hp:number,
    hfp:number
}
type FactorIndex={
    factor:number,
    index:string
}
export interface LicitacionRegisterFields{
    title:string,
    description:string,
    fechaInicioApertura:string,
    fechaFinApertura:string,
    tipoServicio:string,
    numLicitacion:number,
    requisitos:string,
    estado:Estado,
    empresa:string,
    fechaInicio:string,
    fechaFin:string,
    puntoSum:string,
    brg:string,
    factorPlanta:number,
    meses:EspecificacionMes[],
    usuario:string
}
export type LoginFields={
    correo:string,
    password:string
}
export interface OfertaCreateFields{
    potencia:number,
    energiaHp:number,
    energiaHfp:number,
    potMinFacturable:number,
    potenciaFacturar:string,
    excesoPotencia:number,
    formulaIndexPotencia:Types.Array<FactorIndex>, //recommended by mongoose doc
    formulaIndexEnergia:Types.Array<FactorIndex>,
    proveedor:ObjectId,
    licitacion:ObjectId
}
export interface ProveedorRegisterFields{
    correo:string,
    password:string,
    razSocial:string,
    ruc:number,
    pais:string,
    web?:string,
    address:string,
    phone:number
}
export interface UserRegisterFields{
    correo:string,
    password:string,
    empresa:string,
    ruc:number,
    web?:string,
    phone:number,
    address:string
}