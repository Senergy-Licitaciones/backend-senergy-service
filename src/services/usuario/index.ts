import { Types } from 'mongoose'
import { getLicitacionesByUserDao, updateLicitacionDao } from '../../dao/licitacion'
import { getProveedorNameByIdDao } from '../../dao/proveedor'
import { getUsersDao } from '../../dao/usuario'
import { handleError } from '../../helpers/handleError'
import { DocType, ErrorResponse, Info, Licitacion, ResponseParent, User } from '../../types/data'
import { Estado } from '../../types/form/enums'
import { Service, ServiceWithoutParam } from '../../types/methods'
import XLSX from 'xlsx'
import fs from 'fs'

export const getInfoUserService: Service<DocType<User>, Info|ErrorResponse> = async (user) => {
  try {
    const licitaciones = await getLicitacionesByUserDao(user._id)
    if ('error' in licitaciones) return handleError(licitaciones.error, licitaciones.message)
    const numLicitaciones = licitaciones.length
    const numParticipantes = licitaciones.length > 1 ? licitaciones.map((li) => li.participantes.length).reduce((prev, current) => prev + current) : 0
    const lastLicitacion = licitaciones.length > 0
      ? licitaciones.reduce((prev, current) => {
        return current.createdAt > prev.createdAt ? current : prev
      })
      : 'Ninguna Licitación generada hasta el momento'
    const responseLastLicitacion = typeof lastLicitacion === 'string'
      ? { message: lastLicitacion }
      : {
          _id: lastLicitacion._id,
          fechaFinApertura: lastLicitacion.fechaFinApertura,
          fechaInicioapertura: lastLicitacion.fechaInicioApertura,
          participantes: lastLicitacion.participantes.length,
          ruc: user.ruc
        }
    const oneParticipante = licitaciones.filter((li) => li.participantes.length === 1 && li.estado === Estado.Cerrado)
    let lastProvider = ''
    let idLastProvider = new Types.ObjectId()
    if (oneParticipante.length > 1) {
      idLastProvider = oneParticipante.reduce((prev, current) => current.createdAt > prev.createdAt ? current : prev).participantes[0]._id
    } else {
      if (oneParticipante.length === 1) {
        idLastProvider = oneParticipante[0].participantes[0]._id
        const response = await getProveedorNameByIdDao(idLastProvider)
        if ('error' in response) return handleError(response.error, response.message)
        lastProvider = response.razSocial
      } else { lastProvider = 'Sin Proveedor Actualmente' }
    }
    return {
      address: user.address,
      correo: user.correo,
      empresa: typeof lastLicitacion !== 'string' ? lastLicitacion.empresa : user.empresa,
      numLicitaciones,
      numParticipantes,
      lastLicitacion: responseLastLicitacion,
      lastProvider,
      phone: user.phone
    }
  } catch (err) {
    console.log('error ', err)
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
export const getUsersService: ServiceWithoutParam<ErrorResponse|Array<DocType<Pick<User, 'correo'| 'empresa' |'ruc' |'estado'| 'role'>>>> = async () => {
  try {
    const users = await getUsersDao()
    if ('error' in users) throw new Error(users.message)
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
    return handleError(error, 'Ha ocurrido un error en la capa de servicios al obtener las licitaciones')
  }
}
export const generateFileToMonthsDetailsService = (meses: Array<{mes: string, hp: number, hfp: number}>, user: DocType<User>): {filename: string}|{error: Error, message: string} => {
  try {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(meses)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Meses')
    const filename = `${user.ruc}_${user._id as string}_${new Date().getTime()}.xlsx`
    XLSX.writeFile(workbook, `uploads/files/especificacion-mes-ut1/${filename}`)
    return {
      filename
    }
  } catch (err) {
    console.log('error', err)
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios al generar el archivo')
  }
}
export const validateFileService = (filename: string): Array<{mes: string, hp: number, hfp: number}>|{error: Error, message: string} => {
  try {
    const workbook = XLSX.readFile(`uploads/files/especificacion-mes-ut1/${filename}`)
    const sheet = workbook.Sheets.Meses
    const meses = XLSX.utils.sheet_to_json<{mes: string, hp: number, hfp: number}>(sheet)
    fs.rmSync(`uploads/files/especificacion-mes-ut1/${filename}`)
    return meses
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios al validar el archivo')
  }
}
