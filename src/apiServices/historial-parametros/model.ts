import mongoose from 'mongoose'
import { HistorialParametros } from '../../types/data'
import { Parametro, Unidad } from '../../types/data/enums'
const historialParametrosSchema = new mongoose.Schema<HistorialParametros>({
  name: {
    type: String,
    enum: Parametro,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  unidad: {
    type: String,
    enum: Unidad,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})
export default mongoose.model<HistorialParametros>('HistorialParametrosModel', historialParametrosSchema)
