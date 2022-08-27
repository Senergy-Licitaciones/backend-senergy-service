import { Schema, model } from 'mongoose'
import { Tarifa } from '../../types/schemas'
const tarifaEnergiaHpSchema = new Schema<Tarifa>({
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
}
)
export default model<Tarifa>('TarifaEnergiaHpModel', tarifaEnergiaHpSchema)
