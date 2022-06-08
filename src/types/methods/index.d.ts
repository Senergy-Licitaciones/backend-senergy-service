import { RequestHandler } from "express";
import { DataProveedorToken, DataUserToken, ErrorResponse, Proveedor, ResponseRegisterUser, User } from "../data";
import { Role, Type } from "../data/enums";
import { UserRegisterFields } from "../form";

export type Dao<Param,Return>=(fields:Param)=>Promise<Return>
export type Service<Param,Return>=(fields:Param)=>Promise<Return>
export type RegisterUsuarioService=(fields:UserRegisterFields)=>Promise<ErrorResponse|ResponseRegisterUser>
export type SignToken=(user:User|Proveedor)=>string
export type VerifyToken=(token:string)=>null|DataUserToken|DataProveedorToken
export type CheckUserType=(types:Type[])=>RequestHandler
export type CheckRoleAuth=(roles:Role[])=>RequestHandler