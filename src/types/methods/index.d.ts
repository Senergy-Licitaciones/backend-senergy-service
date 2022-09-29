import { RequestHandler } from 'express'
import { DataToken, ErrorResponse, Proveedor, ResponseRegisterUser, User } from '../data'
import { Role, RoleAdmin, Type } from '../data/enums'
import { UserRegisterFields } from '../form'

export type Dao<Param, Return> =(fields: Param) => Promise<Return>
export type Service<Param, Return> =(fields: Param) => Promise<Return>
export type ServiceWithoutParam<Return> =() => Promise<Return>
export type DaoWithoutParam<Return> =() => Promise<Return>
export type RegisterUsuarioService=(fields: UserRegisterFields) => Promise<ErrorResponse|ResponseRegisterUser>
export type SignToken=(user: DocType<User|Proveedor|Admin>) => string
export type VerifyToken=(token: string) => null|DataToken
export type CheckUserType=(types: Type[]) => RequestHandler
export type CheckRoleAuth=(roles: Role[]) => RequestHandler
export type CheckRoleAdminAuth=(roles: RoleAdmin[]) => RequestHandler
export type AdapterMiddleware =<Body, BodyParsed>(cb: (body: Body) => BodyParsed) => RequestHandler
