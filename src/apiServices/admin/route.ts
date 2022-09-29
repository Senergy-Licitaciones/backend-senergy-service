import express from 'express'
import checkAuth from '../../middlewares/checkAuth'
import checkUserType from '../../middlewares/checkUserType'
import { checkRoleAdminAuth } from '../../middlewares/roleAdminAuth'
import { RoleAdmin, Type } from '../../types/data/enums'
import { createAdminUser, deleteAdmin, getAdmins, updateAdmin } from './controller'
const router = express.Router()
router.post('/createAdmin', createAdminUser)
/**
 * @swagger
 * /api/admin/createAdmin:
 *  post:
 *      summary: "Crear Perfil de Administrador"
 *      tags: [Admin]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/admin'
 *      responses:
 *          200:
 *              description: Nuevo Perfil de Administrador creado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/responseMessage'
 *      security:
 *          - bearerAuth: []
 */

router.put('/updateAdmin', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss]), updateAdmin)
router.delete('/deleteAdmin/:id', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Boss]), deleteAdmin)
router.get('/admins', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), getAdmins)
/**
 * @swagger
 * /api/admin/admins:
 *  get:
 *      summary: "Lista de Perfiles de Administradores"
 *      tags: [Admin]
 *      responses:
 *          200:
 *              description: "Arreglo de Perfiles de Administradores registrados"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                                $ref: '#/components/schemas/responseAdmin'
 *      security:
 *          - bearerAuth: []
 */
export default router
