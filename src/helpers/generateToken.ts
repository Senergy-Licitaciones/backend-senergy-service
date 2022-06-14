import jwt, { Secret } from 'jsonwebtoken'
import { config } from 'dotenv'
import { SignToken, VerifyToken } from '../types/methods'
import { DataToken, Proveedor, User } from '../types/data'
import { Document, Types } from 'mongoose'
import { Type } from '../types/data/enums'
config()
export const tokenSignUser: SignToken = (user) => {
  const usuario = user as Document<any, any, User> & User & {
    _id: Types.ObjectId}
  return jwt.sign({
    _id: usuario._id,
    empresa: usuario.empresa,
    role: usuario.role,
    type: Type.User
  },
  process.env.JWT_SECRET as Secret,
  {
    expiresIn: '1h'
  })
}
export const tokenSignProveedor: SignToken = (proveedor) => {
  const provider = proveedor as Document<any, any, Proveedor> & Proveedor & {
    _id: Types.ObjectId}
  return jwt.sign({
    _id: provider._id,
    razSocial: provider.razSocial,
    type: Type.Proveedor
  }, process.env.JWT_SECRET as Secret, {
    expiresIn: '1h'
  })
}
export const verifyToken: VerifyToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as Secret) as DataToken
    return data
  } catch (err) {
    return null
  }
}
