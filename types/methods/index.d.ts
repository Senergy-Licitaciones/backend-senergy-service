import { RequestHandler } from "express";
import { DataProveedorToken, DataUserToken, Proveedor, Role, Type, User } from "../data";

export type SignToken=(user:User|Proveedor)=>string
export type VerifyToken=(token:string)=>null|DataUserToken|DataProveedorToken
export type CheckUserType=(types:Type[])=>RequestHandler
export type CheckRoleAuth=(roles:Role[])=>RequestHandler