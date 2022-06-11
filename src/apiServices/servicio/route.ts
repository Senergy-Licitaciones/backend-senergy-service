import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import checkRoleAuth from '../../middlewares/roleAuth'
import { Role, Type } from '../../types/data/enums'
import { getServicios, addServicio } from './controller'
const router = express.Router()
router.get('/getServicios', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium, Role.Admin]), getServicios)
router.post('/addServicio', addServicio)

export default router
