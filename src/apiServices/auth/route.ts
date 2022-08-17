import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import checkRoleAuth from '../../middlewares/roleAuth'
import { Role, Type } from '../../types/data/enums'
import { loginAdmin, logoutProveedor, confirmProveedorAccount, loginProveedor, logoutUsuario, loginUsuario } from './controller'
import { validateUserLogin } from '../../middlewares/validator'
const router = express.Router()
router.put('/loginProveedor', loginProveedor)
router.put('/loginUsuario', validateUserLogin, loginUsuario)
router.put('/loginAdmin', loginAdmin)
router.put('/logoutUsuario', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), logoutUsuario)
router.put('/logoutProveedor', checkAuth, checkUserType([Type.Proveedor]), checkRoleAuth([Role.Basico, Role.Premium]), logoutProveedor)
// router.post('/registerProveedor', registerProveedor)
// router.post('/registerUsuario', validateUserRegister, registerUsuario)
// router.put('/confirmAccount', validateCode, confirmAccount)
router.put('/confirmProveedorAccount', confirmProveedorAccount)
export default router
