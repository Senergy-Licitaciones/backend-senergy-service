import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
import checkRoleAuth from '../../middlewares/roleAuth'
import { Role, RoleAdmin, Type } from '../../types/data/enums'
import { getOfertas, updateOferta, getOfertaById, ofertaId, licitacionId, getOfertasByLicitacion } from './controller'
const router = express.Router()

router.get('/showOfertas', checkAuth, checkUserType([Type.Proveedor]), checkRoleAuth([Role.Basico, Role.Premium]), getOfertas)
router.get('/ofertaById/:id', checkAuth, checkUserType([Type.Proveedor]), checkRoleAuth([Role.Basico, Role.Premium]), getOfertaById)
router.get('/ofertaByIdToAdmin/:id', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss, RoleAdmin.Employee]), getOfertaById)
router.put('/editOferta/:id', checkAuth, checkUserType([Type.Proveedor]), checkRoleAuth([Role.Basico, Role.Premium]), updateOferta)
router.get('/ofertasByLicitacion/:licitacionId', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss, RoleAdmin.Employee]), getOfertasByLicitacion)
router.param('id', ofertaId)
router.param('licitacionId', licitacionId)
export default router
