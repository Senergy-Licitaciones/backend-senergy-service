import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import checkRoleAuth from '../../middlewares/roleAuth'
import { Role, Type } from '../../types/data/enums'
import { participarLicitacion, showProveedores, getProveedoresToUser, getInfoDashboardProveedor } from './controller'
const router = express.Router()

router.post('/crearOferta', checkAuth, checkUserType([Type.Proveedor]), checkRoleAuth([Role.Basico, Role.Premium, Role.Admin]), participarLicitacion)
router.get('/showProveedores', showProveedores)
router.get('/infoDashboardProveedor', checkAuth, checkUserType([Type.Proveedor]), checkRoleAuth([Role.Basico, Role.Premium, Role.Premium]), getInfoDashboardProveedor)
router.get('/getProveedoresToUser', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium, Role.Admin]), getProveedoresToUser)
export default router
