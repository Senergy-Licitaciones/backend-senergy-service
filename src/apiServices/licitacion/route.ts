import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
// import { upload } from "../../middlewares/filesLicitacion/uploadFile";
import checkRoleAuth from '../../middlewares/roleAuth'
import { Role, RoleAdmin, Type } from '../../types/data/enums'
import { licitacionId, showLicitacionById, showLicitaciones, showLicitacionesFree, getTipos, createLicitacion, updateLicitacion, getLicitaciones } from './controller'
const router = express.Router()

router.get('/licitaciones', showLicitaciones)
router.get('/showLicitaciones', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), getLicitaciones)
router.get('/licitacionId/:id', checkAuth, checkUserType([Type.Proveedor, Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), showLicitacionById)
router.get('/licitacionesLibres', checkAuth, checkUserType([Type.Proveedor]), checkRoleAuth([Role.Basico, Role.Premium]), showLicitacionesFree)
router.post('/crearLicitacion', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), createLicitacion)
router.put('/actualizarLicitacion/:id', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), updateLicitacion)
router.get('/tipoLicitaciones', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), getTipos)
// router.get("/file/:filename",showFile);
// router.param("filename",findFilename);
router.param('id', licitacionId)
export default router
