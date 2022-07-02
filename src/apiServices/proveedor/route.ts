import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
import checkRoleAuth from '../../middlewares/roleAuth'
import { Role, RoleAdmin, Type } from '../../types/data/enums'
import { participarLicitacion, showProveedores, getProveedoresToUser, getInfoDashboardProveedor, createProveedor } from './controller'
const router = express.Router()

router.post('/crearOferta', checkAuth, checkUserType([Type.Proveedor]), checkRoleAuth([Role.Basico, Role.Premium]), participarLicitacion)
router.get('/showProveedores', showProveedores)
router.post('/createProveedor', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), createProveedor)
router.get('/infoDashboardProveedor', checkAuth, checkUserType([Type.Proveedor]), checkRoleAuth([Role.Basico, Role.Premium]), getInfoDashboardProveedor)
router.get('/getProveedoresToUser', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), getProveedoresToUser)
export default router
