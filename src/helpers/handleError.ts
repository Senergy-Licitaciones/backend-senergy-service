import { Response } from 'express'

export const httpError = (res: Response, error: Error): Response<any, Record<string, any>> => {
  return res.status(500).send({
    message: 'Ha ocurrido un error',
    error
  })
}
export const handleError = (error: Error, message: string): {error: Error, message: string} => {
  return {
    error,
    message
  }
}
