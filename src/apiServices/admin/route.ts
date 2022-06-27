import express from 'express'
import { createAdminUser } from './controller'
const router = express.Router()
router.post('/createAdmin', createAdminUser)
export default router
