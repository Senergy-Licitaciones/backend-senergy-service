import { AdapterMiddleware } from '../types/methods'

const adapter: AdapterMiddleware = <Body, BodyParsed>(cb: (body: Body) => BodyParsed) => async (req, res, next) => {
  try {
    const body = req.body as Body
    console.log('body', body)
    const bodyParsed = cb(body)
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
export default adapter
