import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
// import { upload } from "../../middlewares/filesLicitacion/uploadFile";
import checkRoleAuth from '../../middlewares/roleAuth'
import { Role, Type } from '../../types/data/enums'
import { licitacionId, showLicitacionById, showLicitaciones, showLicitacionesFree, getTipos, createLicitacion, updateLicitacion } from './controller'
const router = express.Router()

router.get('/licitaciones', showLicitaciones)
router.get('/licitacionId/:id', checkAuth, checkUserType([Type.Proveedor, Type.User]), checkRoleAuth([Role.Basico, Role.Premium, Role.Admin]), showLicitacionById)
router.get('/licitacionesLibres', checkAuth, checkUserType([Type.Proveedor]), checkRoleAuth([Role.Basico, Role.Premium, Role.Admin]), showLicitacionesFree)
router.post('/crearLicitacion', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium, Role.Admin]), createLicitacion)
router.put('/actualizarLicitacion', updateLicitacion)
router.get('/tipoLicitaciones', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium, Role.Admin]), getTipos)
// router.get("/file/:filename",showFile);
// router.param("filename",findFilename);
router.param('id', licitacionId)
export default router
