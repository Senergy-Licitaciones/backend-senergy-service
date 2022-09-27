import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
import { RoleAdmin, Type } from '../../types/data/enums'
import { createAdminUser, deleteAdmin, getAdmins, updateAdmin } from './controller'
const router = express.Router()
router.post('/createAdmin', createAdminUser)
/**
 * Post track
 * @openapi
 * /admins/createAdmin:
 *    post:
 *      tags:
 *        - admins
 *      summary: "Crear Perfil de Administrador"
 *      description: Este endpoint es para registrar un nuevo perfil de administrador
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/admin"
 *      responses:
 *        '200':
 *          description: Retorna un mensaje de respuesta exitosa.
 *          content:
 *              application/json:
                    schema:
                    $ref: '#/components/schemas/responseMessage'
 *        '400':
 *          description: Datos inválidos enviados.
 *      security:
 *       - bearerAuth: []
 */
router.put('/updateAdmin', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss]), updateAdmin)
router.delete('/deleteAdmin/:id', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss]), deleteAdmin)
router.get('/admins', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), getAdmins)
export default router
