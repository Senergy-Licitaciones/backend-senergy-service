import { RequestHandler } from 'express'

import { verifyToken } from '../helpers/generateToken'
import { DataToken } from '../types/data'

const checkAuth: RequestHandler = async (req, res, next) => {
  try {
    const auth = req.headers.authorization
    if (auth == null) throw new Error('Token no ingresado')
    const token = auth.split(' ').pop()
    if (token === undefined) throw new Error('Token inválido')
    console.log('token ', token)
    const tokenData = verifyToken(token) as DataToken
    if (tokenData._id === '') return res.status(409).send({ message: 'No ha iniciado sesión', error: true })
    console.log('antes del next en check auth')
    return next()
  } catch (err) {
    console.log('error catch checkauth ', err)
    return res.status(409).send({
      message: 'Ha ocurrido un error en el proceso de autenticación'
    })
  }
}
export default checkAuth
