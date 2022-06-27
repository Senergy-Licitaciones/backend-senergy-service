import mongoose from 'mongoose'
import { Admin } from '../../types/data'
const adminSchema = new mongoose.Schema<Admin>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
})
export default mongoose.model<Admin>('AdminModel', adminSchema)
