import { Types } from 'mongoose'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from 'express'
import { DocType, Proveedor, User } from '../data'

declare global {
  namespace Express{
    interface Request{
      user?: DocType<User>
      proveedor?: DocType<Proveedor>
      licitacionId?: Types.ObjectId
      ofertaId?: Types.ObjectId
    }
  }
}
