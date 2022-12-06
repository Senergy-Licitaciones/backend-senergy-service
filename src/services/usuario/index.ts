import { Types } from 'mongoose'
import { getLicitacionesByUserDao, updateLicitacionDao } from '../../dao/licitacion'
import { getProveedorNameByIdDao } from '../../dao/proveedor'
import { createUserDao, getUsersDao } from '../../dao/usuario'
import { handleError } from '../../helpers/handleError'
import { DocType, Info, Licitacion, ResponseParent, User } from '../../types/data'
import { Estado } from '../../types/form/enums'
import { Service, ServiceWithoutParam } from '../../types/methods'
import XLSX from 'xlsx'
import fs from 'fs'
import { Role } from '../../types/data/enums'

export const getInfoUserService: Service<DocType<User>, Info> = async (user) => {
  try {
    const licitaciones = await getLicitacionesByUserDao(user._id)
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
    throw handleError(err)
  }
}
export const changeStatusService: Service<{status: Estado, id: Types.ObjectId}, ResponseParent> = async ({ status, id }) => {
  try {
    await updateLicitacionDao({ fields: { status }, id })
    return {
      message: 'Estado de la licitación actualizado'
    }
  } catch (err) {
    throw handleError(err)
  }
}
export const getUsersService: ServiceWithoutParam<Array<DocType<Pick<User, 'correo'| 'empresa' |'ruc' |'phone'| 'role'>>>> = async () => {
  try {
    const users = await getUsersDao()
    return users
  } catch (err) {
    throw handleError(err)
  }
}
export const getLicitacionesByUser: Service<Types.ObjectId, Array<DocType<Licitacion>>> = async (id) => {
  try {
    const licitaciones = await getLicitacionesByUserDao(id)
    return licitaciones
  } catch (err) {
    throw handleError(err)
  }
}
export const generateFileToMonthsDetailsService = (meses: Array<{mes: string, hp: number, hfp: number}>, user: DocType<User>): {filename: string} => {
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
    throw handleError(err)
  }
}
export const validateFileService = (filename: string): Array<{mes: string, hp: number, hfp: number}> => {
  try {
    const workbook = XLSX.readFile(`uploads/files/especificacion-mes-ut1/${filename}`)
    const sheet = workbook.Sheets.Meses
    const meses = XLSX.utils.sheet_to_json<{mes: string, hp: number, hfp: number}>(sheet)
    fs.rmSync(`uploads/files/especificacion-mes-ut1/${filename}`)
    return meses
  } catch (err) {
    throw handleError(err)
  }
}
export const addUserService: Service<{empresa: string, address: string, correo: string, password: string, role: Role, web: string, phone: string, ruc: string}, {message: string}> = async (payload) => {
  try {
    const response = await createUserDao(payload)
    return response
  } catch (e) {
    throw handleError(e)
  }
}
