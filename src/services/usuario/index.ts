import { Types } from 'mongoose'
import { getLicitacionesByUserDao, updateLicitacionDao } from '../../dao/licitacion'
import { getProveedorNameByIdDao } from '../../dao/proveedor'
import { getUsersDao } from '../../dao/usuario'
import { handleError } from '../../helpers/handleError'
import { DocType, ErrorResponse, Info, Licitacion, ResponseParent, User } from '../../types/data'
import { Estado } from '../../types/form/enums'
import { Service, ServiceWithoutParam } from '../../types/methods'

export const getInfoUserService: Service<DocType<User>, Info|ErrorResponse> = async (user) => {
  try {
    const licitaciones = await getLicitacionesByUserDao(user._id)
    if ('error' in licitaciones) return handleError(licitaciones.error, licitaciones.message)
    const numLicitaciones = licitaciones.length
    const numParticipantes = licitaciones.map((li) => li.participantes.length).reduce((prev, current) => prev + current)
    const lastLicitacion = licitaciones.reduce((prev, current) => {
      return current.createdAt > prev.createdAt ? current : prev
    })
    const oneParticipante = licitaciones.filter((li) => li.participantes.length === 1)
    let lastProvider = ''
    let idLastProvider = new Types.ObjectId()
    if (oneParticipante.length > 1) {
      idLastProvider = oneParticipante.reduce((prev, current) => current.createdAt > prev.createdAt ? current : prev).participantes[0]._id
    } else {
      oneParticipante.length === 1 ? idLastProvider = oneParticipante[0].participantes[0]._id : lastProvider = 'Sin Proveedor Actualmente'
    }
    const response = await getProveedorNameByIdDao(idLastProvider)
    if ('error' in response) return handleError(response.error, response.message)
    lastProvider = response.razSocial
    return {
      address: user.address,
      correo: user.correo,
      empresa: user.empresa,
      numLicitaciones,
      numParticipantes,
      lastLicitacion: {
        _id: lastLicitacion._id,
        fechaFinApertura: lastLicitacion.fechaFinApertura,
        fechaInicioapertura: lastLicitacion.fechaInicioApertura,
        participantes: lastLicitacion.participantes.length,
        ruc: response.ruc
      },
      lastProvider,
      phone: user.phone
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios al obtener la información')
  }
}
export const changeStatusService: Service<{status: Estado, id: Types.ObjectId}, ErrorResponse|ResponseParent> = async ({ status, id }) => {
  try {
    const result = await updateLicitacionDao({ fields: { status }, id })
    if ('error' in result)handleError(result.error, result.message)
    return {
      message: 'Estado de la licitación actualizado'
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Error en la capa de servicios')
  }
}
export const getUsersService: ServiceWithoutParam<ErrorResponse|Array<DocType<User>>> = async () => {
  try {
    const users = await getUsersDao()
    if ('error' in users) return handleError(users.error, users.message)
    return users
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios al obtener los usuarios')
  }
}
export const getLicitacionesByUser: Service<Types.ObjectId, ErrorResponse|Array<DocType<Licitacion>>> = async (id) => {
  try {
    const licitaciones = await getLicitacionesByUserDao(id)
    if ('error' in licitaciones) return handleError(licitaciones.error, licitaciones.message)
    return licitaciones
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios al obtener las licitacioens')
  }
}
