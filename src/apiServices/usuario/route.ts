import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
import checkRoleAuth from '../../middlewares/roleAuth'
import { Role, RoleAdmin, Type } from '../../types/data/enums'
import { changeStatus, getInfoUser, showUsers, showLicitaciones } from './controller'
const router = express.Router()
router.get('/getInfoDashboard', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), getInfoUser)
router.post('/changeStatus', changeStatus)
router.get('/getLicitaciones', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), showLicitaciones)
router.get('/users', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), showUsers)
export default router
