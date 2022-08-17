import { Types } from 'mongoose'
import { getOfertasDao, getOfertaByIdDao, updateOfertaDao } from '../../dao/oferta'
import { handleError } from '../../helpers/handleError'
import { DocType, Oferta, ResponseParent } from '../../types/data'
import { Service } from '../../types/methods'

export const getOfertasService: Service<Types.ObjectId, Array<DocType<Oferta>>> = async (id) => {
  try {
    const ofertas = await getOfertasDao(id)
    return ofertas
  } catch (err) {
    throw handleError(err)
  }
}
export const getOfertaByIdService: Service<Types.ObjectId, DocType<Oferta>> = async (ofertaId) => {
  try {
    const oferta = await getOfertaByIdDao(ofertaId)
    return oferta
  } catch (err) {
    throw handleError(err)
  }
}
export const updateOfertaService: Service<{ofertaId: Types.ObjectId, fields: Partial<Oferta>}, ResponseParent> = async ({ ofertaId, fields }) => {
  try {
    const oferta = await updateOfertaDao({ ofertaId, fields })
    return {
      message: `Oferta para ${oferta.licitacion.empresa} actualizada exitosamente `
    }
  } catch (err) {
    throw handleError(err)
  }
}
