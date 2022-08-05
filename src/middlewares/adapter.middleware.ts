import { RequestHandler } from 'express'
import { createOfertaAdapter } from '../adapters'
import { OfertaRequest } from '../types/requests'

const adapterOferta: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body as OfertaRequest
    console.log('body', body)
    const bodyParsed = createOfertaAdapter(body)
    console.log('parsed', bodyParsed)
    req.body = bodyParsed
    return next()
  } catch (err) {
    console.log('error catch adapter ', err)
    const error = err as Error
    return res.status(409).send({
      message: `Ha ocurrido un error al adaptar la petición: ${error.message}`,
      error: err
    })
  }
}
export default adapterOferta
