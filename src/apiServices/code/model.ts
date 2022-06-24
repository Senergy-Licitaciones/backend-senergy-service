import mongoose from 'mongoose'
import { CodeUser } from '../../types/data'
const codeSchema = new mongoose.Schema<CodeUser>({
  code: {
    type: String,
    length: 6,
    unique: true,
    required: true
  },
  expiredTime: {
    type: Date,
    expires: 300
  },
  user: {
    type: String,
    trim: true,
    required: true,
    unique: true
  }
}, {
  versionKey: false,
  timestamps: true
})
export default mongoose.model<CodeUser>('CodeModel', codeSchema)
