import mongoose from 'mongoose'
import { Oferta } from '../../types/data'
const { ObjectId } = mongoose.Schema.Types
const ofertaSchema = new mongoose.Schema<Oferta>({
  potencia: [
    {
      fechaInicio: {
        type: Date,
        required: true
      },
      fechaFin: {
        type: Date,
        required: true
      },
      potencia: {
        type: Number,
        required: true
      }
    }
  ],
  tarifaPotencia: {
    type: Boolean,
    default: false,
    required: true
  },
  tarifaEnergiaHp: {
    type: Boolean,
    default: false,
    required: true
  },
  tarifaEnergiaHfp: {
    type: Boolean,
    default: false,
    required: true
  },
  energiaHp: [
    {
      fechaInicio: {
        type: Date,
        required: true
      },
      fechaFin: {
        type: Date,
        required: true
      },
      energia: {
        type: Number,
        required: true
      }
    }
  ],
  energiaHfp: [
    {
      fechaInicio: {
        type: Date,
        required: true
      },
      fechaFin: {
        type: Date,
        required: true
      },
      energia: {
        type: Number,
        required: true
      }
    }
  ],
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
      indexId: {
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
      indexId: {
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
  },
  excesoEnergiaHp: {
    type: Number
  },
  excesoEnergiaHfp: {
    type: Number
  }
}, {
  versionKey: false,
  timestamps: true
})
export default mongoose.model<Oferta>('OfertaModel', ofertaSchema)
