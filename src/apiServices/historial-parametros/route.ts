import express from 'express'
import { createExportFileDates } from '../../adapters'
import { adapter } from '../../middlewares'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import uploadParametros from '../../middlewares/filesUser/uploadParametros'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
import checkRoleAuth from '../../middlewares/roleAuth'
import { ExportFileAdminData } from '../../types/data'
import { Role, RoleAdmin, Type } from '../../types/data/enums'
import { ExportFileAdminRequest } from '../../types/requests'
import { addParametros, deleteParametros, downloadFile, exportFile, exportFileToUpdate, exportProyeccionFile, getFilename, getNames, getParametros, updateParametro, updateParametros, updateParametrosByDate } from './controller'
const router = express.Router()

// router.post('/addParametro', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), addParametro)
router.post('/exportFile', adapter<ExportFileAdminRequest, ExportFileAdminData>(createExportFileDates), checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), exportFile)
router.delete('/deleteParametros', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss]), deleteParametros)
router.get('/downloadFile/:filename', downloadFile)
router.post('/exportFileToUpdate', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss, RoleAdmin.Employee]), exportFileToUpdate)
router.post('/proyecciones/exportFile/:idLicitacion', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss, RoleAdmin.Employee]), exportProyeccionFile)
router.param('filename', getFilename)
router.post('/addParametros/:filename', uploadParametros, checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), addParametros)
router.put('/updateParametros/:filename', uploadParametros, checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), updateParametros)
router.put('/updateParametro/:idParametro', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), updateParametro)
router.put('/updateParametrosByDate', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), updateParametrosByDate)
router.get('/getParametros', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), getParametros)
router.get('/getNames', checkAuth, checkUserType([Type.Proveedor]), checkRoleAuth([Role.Basico, Role.Premium]), getNames)
/**
 * @swagger
 * /api/historial-parametros/getNames:
 *  get:
 *      summary: "Nombres de Parámetros"
 *      tags: [Historial de Parámetros Base]
 *      description: "Lista de Nombres de Parámetros ocupados por el Generador al enviar su oferta"
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/parametroName'
 *      security:
 *          - bearerAuth: []
 */
export default router
