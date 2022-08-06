import { AdapterMiddleware } from '../types/methods'
export const adapter: AdapterMiddleware = <Body, BodyParser>(cb: (body: Body) => BodyParser) => (req, res, next) => {
  try {
    const body = req.body as Body
    const bodyParsed = cb(body)
    req.body = bodyParsed
    return next()
  } catch (err) {
    console.log(err)
    const error = err as Error
    return res.status(409).send({
      message: 'Ha ocurrido un error al adaptar la petición',
      error: error
    })
  }
}
