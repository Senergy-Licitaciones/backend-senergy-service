import { Types } from 'mongoose'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from 'express'
import { DocType, Proveedor, User, Admin } from '../data'

declare global {
  namespace Express{
    interface Request{
      user?: DocType<User>
      admin?: DocType<Admin>
      proveedor?: DocType<Proveedor>
      licitacionId?: Types.ObjectId
      ofertaId?: Types.ObjectId
      filename?: string
    }
  }
}
