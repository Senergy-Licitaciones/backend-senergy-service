"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const checkUserType_1 = __importDefault(require("../../middlewares/checkUserType"));
const roleAdminAuth_1 = require("../../middlewares/roleAdminAuth");
const enums_1 = require("../../types/data/enums");
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post('/createAdmin', controller_1.createAdminUser);
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
router.put('/updateAdmin', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Boss]), controller_1.updateAdmin);
router.delete('/deleteAdmin/:id', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Boss]), controller_1.deleteAdmin);
router.get('/admins', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Employee, enums_1.RoleAdmin.Boss]), controller_1.getAdmins);
exports.default = router;
