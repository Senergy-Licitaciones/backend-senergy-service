import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import uploadParametros from '../../middlewares/filesUser/uploadParametros'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
// import { upload } from "../../middlewares/filesLicitacion/uploadFile";
import checkRoleAuth from '../../middlewares/roleAuth'
import { Role, RoleAdmin, Type } from '../../types/data/enums'
import { licitacionId, showLicitacionById, showLicitaciones, showLicitacionesFree, getTipos, createLicitacion, updateLicitacion, getLicitaciones, makeCalculo, makeCalculoExcel } from './controller'
const router = express.Router()

router.get('/licitaciones', showLicitaciones)
router.get('/calculo/:id', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), makeCalculo)
/**
 * @swagger
 *  /api/licitacion/calculo/{id}:
 *  get:
 *      summary: "Precios proyectados y Generador ganador del cálculo"
 *      description: "Realiza el cálculo de los precios para las ofertas dadas para una Licitación"
 *      tags: [Licitación]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: "Id de la Licitación"
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/responseCalculo'
 */
router.post('/calculoExcel/:id', uploadParametros, checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss, RoleAdmin.Employee]), makeCalculoExcel)
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
