import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import uploadFileEspecificacion from '../../middlewares/filesUser/uploadFileEspecificacion'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
import checkRoleAuth from '../../middlewares/roleAuth'
import { Role, RoleAdmin, Type } from '../../types/data/enums'
import { changeStatus, getInfoUser, showUsers, showLicitaciones, getEspecificacionMes, generateFileToMonthsDetails, filename, validateFile } from './controller'
const router = express.Router()
router.get('/getInfoDashboard', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), getInfoUser)
router.post('/changeStatus', changeStatus)
router.get('/getLicitaciones', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), showLicitaciones)
router.get('/users', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), showUsers)
router.post('/generate-file-to-months-details', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), generateFileToMonthsDetails)
router.get('/download/especificacionMes/:filename', getEspecificacionMes)
router.post('/validate-file/:filename', uploadFileEspecificacion, validateFile)
router.param('filename', filename)
export default router
