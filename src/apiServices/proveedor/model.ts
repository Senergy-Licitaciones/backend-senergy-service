import mongoose from 'mongoose'
import { Proveedor } from '../../types/data'
import { Estado, Role } from '../../types/data/enums'
const proveedorSchema = new mongoose.Schema<Proveedor>({
  razSocial: {
    type: String,
    trim: true,
    required: true
  },
  ruc: {
    type: Number,
    length: 11,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: Role,
    trim: true,
    required: true,
    default: Role.Basico
  },
  pais: {
    type: String,
    trim: true
  },
  web: {
    type: String,
    trim: true
  },
  correo: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    length: 9,
    trim: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  licitaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LicitacionModel'
    }
  ],
  estado: {
    type: String,
    enum: Estado,
    required: true,
    default: Estado.Offline
  },
  codeToConfirm: {
    type: String,
    trim: true
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  session: {
    type: String,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
})
export default mongoose.model<Proveedor>('ProveedorModel', proveedorSchema)
