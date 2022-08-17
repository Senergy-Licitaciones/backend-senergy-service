import { Licitacion } from '../data'

export type LicitacionToAdmin = DocType<Pick<Licitacion, 'author'|'createdAt'|'updatedAt'|'empresa'|'estado'|'fechaFin'|'fechaInicio'|'fechaInicioApertura'|'fechaFinApertura'|'participantes'>>
