import mongoose from 'mongoose'
import { HistorialParametro } from '../../types/schemas'
const historialParametrosSchema = new mongoose.Schema<HistorialParametro>({
  name: {
    type: String,
    trim: true,
    required: true
  },
  values: [
    {
      _id: false,
      fecha: {
        type: String,
        required: true,
        trim: true
      },
      value: {
        type: Number,
        required: true
      }
    }
  ]
}, {
  versionKey: false,
  timestamps: true
})
export default mongoose.model<HistorialParametro>('HistorialParametrosModel', historialParametrosSchema)
