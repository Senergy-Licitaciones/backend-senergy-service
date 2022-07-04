import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
import { RoleAdmin, Type } from '../../types/data/enums'
import { addParametro } from './controller'
const router = express.Router()

router.post('/addParametro', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), addParametro)

export default router
