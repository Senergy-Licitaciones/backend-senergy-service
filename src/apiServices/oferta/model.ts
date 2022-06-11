import mongoose from 'mongoose'
import { Oferta } from '../../types/data'
const { ObjectId } = mongoose.Schema.Types
const ofertaSchema = new mongoose.Schema<Oferta>({
  potencia: {
    type: Number,
    required: true
  },
  energiaHp: {
    type: Number,
    required: true
  },
  energiaHfp: {
    type: Number,
    required: true
  },
  potMinFacturable: {
    type: Number,
    required: true
  },
  potenciaFacturar: {
    type: String,
    trim: true,
    required: true
  },
  excesoPotencia: {
    type: Number,
    required: true
  },
  formulaIndexPotencia: [
    {
      index: {
        type: String,
        required: true,
        trim: true
      },
      factor: {
        type: Number,
        required: true
      }
    }
  ],
  formulaIndexEnergia: [
    {
      index: {
        type: String,
        required: true,
        trim: true
      },
      factor: {
        type: Number,
        required: true
      }
    }
  ],
  proveedor: {
    type: ObjectId,
    ref: 'ProveedorModel',
    required: true
  },
  licitacion: {
    type: ObjectId,
    ref: 'LicitacionModel',
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})
export default mongoose.model<Oferta>('OfertaModel', ofertaSchema)
