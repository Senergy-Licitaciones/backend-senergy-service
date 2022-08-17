import bcrypt from 'bcryptjs'
import { Service } from '../types/methods'
import { handleError } from './handleError'

export const encrypt: Service<string, string> = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10)
    return hash
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al momento de encriptar la contraseña')
  }
}
export const compare: Service<{password: string, hash: string}, boolean> = async (fields) => {
  try {
    const { password, hash } = fields
    const res = await bcrypt.compare(password, hash)
    return res
  } catch (err) {
    throw handleError(err, 'Ha ocurrido un error al verificar la contraseña')
  }
}
