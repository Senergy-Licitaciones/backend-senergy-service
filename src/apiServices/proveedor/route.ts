import express from 'express'
import { createOfertaAdapter } from '../../adapters'
import adapter from '../../middlewares/adapter.middleware'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
import checkRoleAuth from '../../middlewares/roleAuth'
import { Oferta } from '../../types/data'
import { Role, RoleAdmin, Type } from '../../types/data/enums'
import { OfertaRequest } from '../../types/requests'
import { participarLicitacion, showProveedores, getProveedoresToUser, getInfoDashboardProveedor, createProveedor } from './controller'
const router = express.Router()

router.post('/crearOferta',
  adapter<OfertaRequest, Omit<Oferta, 'createdAt'|'updatedAt'>>(createOfertaAdapter),
  checkAuth,
  checkUserType([Type.Proveedor]),
  checkRoleAuth([Role.Basico, Role.Premium]),
  participarLicitacion)
router.get('/proveedores', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), showProveedores)
router.post('/createProveedor', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), createProveedor)
router.get('/infoDashboardProveedor', checkAuth, checkUserType([Type.Proveedor]), checkRoleAuth([Role.Basico, Role.Premium]), getInfoDashboardProveedor)
router.get('/getProveedoresToUser', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), getProveedoresToUser)
export default router
