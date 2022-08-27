import express from 'express'
import { createExportFileDates } from '../../adapters'
import { adapter } from '../../middlewares'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import uploadTarifas from '../../middlewares/filesUser/uploadTarifas'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
import { ExportFileAdminData } from '../../types/data'
import { RoleAdmin, Type } from '../../types/data/enums'
import { ExportFileAdminRequest } from '../../types/requests'
import { addTarifas, deleteTarifas, downloadFile, exportFile, exportFileToUpdate, getFilename, getTarifas, updateTarifa, updateTarifas } from './controller'
const router = express.Router()

router.post('/exportFile', adapter<ExportFileAdminRequest, ExportFileAdminData>(createExportFileDates), checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), exportFile)
router.delete('/deleteTarifas', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss]), deleteTarifas)
router.get('/downloadFile/:filename', downloadFile)
router.param('filename', getFilename)
router.post('/exportFileToUpdate', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss, RoleAdmin.Employee]), exportFileToUpdate)
router.post('/addTarifas/:filename', uploadTarifas, checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), addTarifas)
router.put('/updateTarifas/:filename', uploadTarifas, checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), updateTarifas)
router.put('/updateTarifa/:idTarifa', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), updateTarifa)
router.get('/getTarifas', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), getTarifas)

export default router
