import { Response } from 'express'

export const httpError = (res: Response, error: any): Response<any, Record<string, any>> => {
  if (error.message == null) return res.status(500).send({ message: 'Ha ocurrido un error en el servidor' })
  const e = error as Error
  return res.status(400).send({
    message: e.message
  })
}
export const handleError = (e: any, message?: string): Error => {
  const error = e as Error
  return new Error(message != null ? message : error.message)
}
