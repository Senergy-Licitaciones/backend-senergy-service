import mongoose from 'mongoose'
import { Admin } from '../../types/data'
import { RoleAdmin } from '../../types/data/enums'
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
  },
  role: {
    type: String,
    enum: RoleAdmin,
    trim: true,
    required: true,
    default: RoleAdmin.Employee
  }
}, {
  versionKey: false,
  timestamps: true
})
export default mongoose.model<Admin>('AdminModel', adminSchema)
