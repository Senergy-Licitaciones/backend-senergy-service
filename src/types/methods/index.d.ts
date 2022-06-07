import { RequestHandler } from "express";
import { DataProveedorToken, DataUserToken, Proveedor, User } from "../data";
import { Role, Type } from "../data/enums";

export type SignToken=(user:User|Proveedor)=>string
export type VerifyToken=(token:string)=>null|DataUserToken|DataProveedorToken
export type CheckUserType=(types:Type[])=>RequestHandler
export type CheckRoleAuth=(roles:Role[])=>RequestHandler