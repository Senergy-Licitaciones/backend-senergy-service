import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import checkRoleAuth from '../../middlewares/roleAuth'
import { Role, Type } from '../../types/data/enums'
import { changeStatus, getInfoUser, showUsers, showLicitaciones } from './controller'
const router = express.Router()
router.get('/getInfoDashboard', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium, Role.Admin]), getInfoUser)
router.post('/changeStatus', changeStatus)
router.get('/getLicitaciones', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium, Role.Admin]), showLicitaciones)
router.get('/showUsers', showUsers)
export default router
