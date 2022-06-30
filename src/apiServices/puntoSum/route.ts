import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import checkRoleAuth from '../../middlewares/roleAuth'
import { Role, Type } from '../../types/data/enums'
import { getPuntoSum, addPuntoSum } from './controller'
const router = express.Router()
router.get('/getPuntoSums', checkAuth, checkUserType([Type.User]), checkRoleAuth([Role.Basico, Role.Premium]), getPuntoSum)
router.post('/addPuntoSum', addPuntoSum)
export default router
