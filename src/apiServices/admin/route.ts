import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
import { RoleAdmin, Type } from '../../types/data/enums'
import { createAdminUser, deleteAdmin, getAdmins, updateAdmin } from './controller'
const router = express.Router()
router.post('/createAdmin', createAdminUser)
router.put('/updateAdmin', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss]), updateAdmin)
router.delete('/deleteAdmin/:id', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss]), deleteAdmin)
router.get('/admins', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), getAdmins)
export default router
